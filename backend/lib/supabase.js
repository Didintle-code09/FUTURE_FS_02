const SUPABASE_URL = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const defaultHeaders = {
  apikey: SUPABASE_SERVICE_ROLE_KEY,
  Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
  'Content-Type': 'application/json',
};

const buildUrl = (table, query = {}) => {
  const url = new URL(`/rest/v1/${table}`, SUPABASE_URL);

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, value);
    }
  });

  return url;
};

const parseResponseBody = async (response) => {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const request = async ({ body, headers = {}, method = 'GET', query, table }) => {
  const response = await fetch(buildUrl(table, query), {
    method,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  const data = await parseResponseBody(response);

  if (!response.ok) {
    const error = new Error(data?.message || data?.error_description || data?.hint || 'Supabase request failed');
    error.status = response.status;
    error.details = data;
    throw error;
  }

  return data;
};

const select = (table, query = {}) =>
  request({
    table,
    query: {
      select: '*',
      ...query,
    },
  });

const insert = (table, body) =>
  request({
    method: 'POST',
    table,
    body,
    headers: {
      Prefer: 'return=representation',
    },
  });

const update = (table, query, body) =>
  request({
    method: 'PATCH',
    table,
    query,
    body,
    headers: {
      Prefer: 'return=representation',
    },
  });

const remove = (table, query) =>
  request({
    method: 'DELETE',
    table,
    query,
    headers: {
      Prefer: 'return=representation',
    },
  });

module.exports = {
  insert,
  remove,
  select,
  update,
};
