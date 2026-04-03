const SUPABASE_URL = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || '';

const authRequest = async ({ body, headers = {}, method = 'GET', path, useServiceRole = false }) => {
  const response = await fetch(`${SUPABASE_URL}${path}`, {
    method,
    headers: {
      apikey: useServiceRole ? SUPABASE_SERVICE_ROLE_KEY : SUPABASE_PUBLISHABLE_KEY,
      ...(useServiceRole ? { Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}` } : {}),
      'Content-Type': 'application/json',
      ...headers,
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const error = new Error(
      data?.msg ||
      data?.message ||
      data?.error_description ||
      data?.error ||
      'Supabase auth request failed'
    );
    error.status = response.status;
    error.details = data;
    throw error;
  }

  return data;
};

const formatUser = (user) => ({
  id: user.id,
  username: user.user_metadata?.username || user.email?.split('@')[0] || 'LeadNest user',
  email: user.email,
  role: user.role || 'authenticated',
});

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isRetryableInvalidCredentialError = (error) =>
  error?.message?.toLowerCase().includes('invalid login credentials');

const signInWithPassword = async (email, password) =>
  authRequest({
    method: 'POST',
    path: '/auth/v1/token?grant_type=password',
    body: {
      email,
      password,
    },
  });

const signInWithRetry = async (email, password, { attempts = 1, delayMs = 0 } = {}) => {
  let lastError;

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      return await signInWithPassword(email, password);
    } catch (error) {
      lastError = error;

      const shouldRetry =
        attempt < attempts - 1 &&
        isRetryableInvalidCredentialError(error);

      if (!shouldRetry) {
        throw error;
      }

      await wait(delayMs);
    }
  }

  throw lastError;
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { username, email, password, passwordConfirm } = req.body;
    const normalizedUsername = username?.trim();
    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedUsername || !normalizedEmail || !password || !passwordConfirm) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    if (password !== passwordConfirm) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      });
    }

    await authRequest({
      method: 'POST',
      path: '/auth/v1/admin/users',
      useServiceRole: true,
      body: {
        email: normalizedEmail,
        password,
        email_confirm: true,
        user_metadata: {
          username: normalizedUsername,
        },
      },
    });

    const session = await signInWithRetry(normalizedEmail, password, {
      attempts: 4,
      delayMs: 1500,
    });

    res.status(201).json({
      success: true,
      token: session.access_token,
      user: formatUser(session.user),
      message: 'User registered successfully',
    });
  } catch (error) {
    res.status(error.status || 400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const session = await signInWithRetry(normalizedEmail, password, {
      attempts: 3,
      delayMs: 1200,
    });

    res.status(200).json({
      success: true,
      token: session.access_token,
      user: formatUser(session.user),
      message: 'Logged in successfully',
    });
  } catch (error) {
    res.status(error.status || 400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: formatUser(req.user),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
