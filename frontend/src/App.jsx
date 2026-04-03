import { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard.jsx';
import LoginForm from './components/LoginForm.jsx';
import RegisterForm from './components/RegisterForm.jsx';
import Footer from './components/home/Footer.jsx';
import Hero from './components/home/Hero.jsx';
import LeadsPreview from './components/home/LeadsPreview.jsx';
import LogoMark from './components/home/LogoMark.jsx';
import Navbar from './components/home/Navbar.jsx';
import QuickActions from './components/home/QuickActions.jsx';
import SectionReveal from './components/home/SectionReveal.jsx';
import StatsCards from './components/home/StatsCards.jsx';
import { ArrowUpIcon, MoonIcon, SunIcon } from './components/home/Icons.jsx';
import { mockLeads } from './data/mockLeads.js';
import { authAPI } from './services/api';

const THEME_STORAGE_KEY = 'leadforge-theme';

function App() {
  const [theme, setTheme] = useState('light');
  const [page, setPage] = useState('welcome');
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [leads] = useState(mockLeads);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const response = await authAPI.getMe();
        setUser(response.data.user);
        setIsAuthenticated(true);
        setPage('dashboard');
      } catch {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 18);
      setShowBackToTop(offset > 520);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (page !== 'welcome') {
      return undefined;
    }

    const sections = Array.from(document.querySelectorAll('[data-section]'));
    if (!sections.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((firstEntry, secondEntry) => secondEntry.intersectionRatio - firstEntry.intersectionRatio);

        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        threshold: [0.2, 0.45, 0.7],
        rootMargin: '-18% 0px -34% 0px',
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [page]);

  const stats = [
    {
      label: 'Total Leads',
      value: leads.length,
      detail: '+18% from last month',
      icon: 'stack',
    },
    {
      label: 'New Leads',
      value: leads.filter((lead) => lead.status === 'new').length,
      detail: '6 inbound this week',
      icon: 'spark',
    },
    {
      label: 'Contacted Leads',
      value: leads.filter((lead) => lead.status === 'contacted').length,
      detail: '2 follow ups due today',
      icon: 'chat',
    },
    {
      label: 'Converted Leads',
      value: leads.filter((lead) => lead.status === 'converted').length,
      detail: '31% close rate in Q2',
      icon: 'trophy',
    },
  ];

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  const openPage = (nextPage) => {
    setMobileMenuOpen(false);
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAuthPage = (nextPage) => {
    if (isAuthenticated) {
      openPage('dashboard');
      return;
    }

    openPage(nextPage);
  };

  const openDashboard = () => {
    if (isAuthenticated) {
      openPage('dashboard');
      return;
    }

    openAuthPage('login');
  };

  const navigateToSection = (sectionId) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  const handleLoginSuccess = (token, userData) => {
    localStorage.setItem('token', token);
    setUser(userData);
    setIsAuthenticated(true);
    openPage('dashboard');
  };

  const handleRegisterSuccess = (token, userData) => {
    localStorage.setItem('token', token);
    setUser(userData);
    setIsAuthenticated(true);
    openPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    openPage('welcome');
  };

  const renderThemeToggle = () => (
    <button
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="theme-toggle"
      onClick={toggleTheme}
      type="button"
    >
      <span className={`theme-icon ${theme === 'light' ? 'is-visible' : ''}`}>
        <MoonIcon />
      </span>
      <span className={`theme-icon ${theme === 'dark' ? 'is-visible' : ''}`}>
        <SunIcon />
      </span>
    </button>
  );

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-panel panel-card">
          <LogoMark />
          <h1>Loading LeadForge</h1>
          <p>Checking your workspace and preparing the right next step.</p>
        </div>
      </div>
    );
  }

  if (page === 'login' || page === 'signup') {
    const isLoginPage = page === 'login';

    return (
      <div className="auth-page">
        <header className={`portal-header ${isScrolled ? 'is-scrolled' : ''}`}>
          <div className="section-frame portal-header-inner">
            <button className="brand-lockup" onClick={() => openPage('welcome')} type="button">
              <LogoMark />
              <div className="brand-copy">
                <span className="brand-name">LeadForge</span>
                <span className="brand-tag">Track leads, close deals, grow smarter.</span>
              </div>
            </button>

            <div className="portal-actions">
              <button className="secondary-button compact-button" onClick={() => openPage('welcome')} type="button">
                Back to Welcome
              </button>
              {renderThemeToggle()}
            </div>
          </div>
        </header>

        <main className="auth-page-main">
          <div className="section-frame auth-layout">
            <section className="panel-card auth-aside">
              <span className="section-label">{isLoginPage ? 'Welcome Back' : 'Create Account'}</span>
              <h1>{isLoginPage ? 'Log in to your dashboard and pick up where you left off.' : 'Sign up and move from interest to revenue faster.'}</h1>
              <p>
                {isLoginPage
                  ? 'Your welcome page is now separate from the product workspace, so returning users can jump straight into leads and follow ups.'
                  : 'Create an account to unlock the authenticated dashboard, lead management tools, and the workflow engine behind LeadForge.'}
              </p>

              <div className="auth-feature-list">
                <div className="auth-feature-item">
                  <strong>Responsive onboarding</strong>
                  <span>Welcome, auth, and dashboard now live as separate views.</span>
                </div>
                <div className="auth-feature-item">
                  <strong>Theme persistence</strong>
                  <span>Light and dark mode carry through every page in the flow.</span>
                </div>
                <div className="auth-feature-item">
                  <strong>API ready foundation</strong>
                  <span>Authentication and lead data still connect through your existing service layer.</span>
                </div>
              </div>
            </section>

            <section className="panel-card auth-form-shell">
              {isLoginPage ? <LoginForm onSuccess={handleLoginSuccess} /> : <RegisterForm onSuccess={handleRegisterSuccess} />}

              <p className="auth-toggle">
                {isLoginPage ? "Don't have an account?" : 'Already have an account?'}
                <button className="toggle-btn" onClick={() => openAuthPage(isLoginPage ? 'signup' : 'login')} type="button">
                  {isLoginPage ? 'Sign Up' : 'Log In'}
                </button>
              </p>
            </section>
          </div>
        </main>
      </div>
    );
  }

  if (page === 'dashboard' && isAuthenticated) {
    return (
      <div className="dashboard-page">
        <header className={`portal-header ${isScrolled ? 'is-scrolled' : ''}`}>
          <div className="section-frame portal-header-inner">
            <button className="brand-lockup" onClick={() => openPage('welcome')} type="button">
              <LogoMark />
              <div className="brand-copy">
                <span className="brand-name">LeadForge</span>
                <span className="brand-tag">Your authenticated CRM workspace</span>
              </div>
            </button>

            <div className="portal-actions">
              <div className="portal-user-chip">Welcome, {user?.username || 'LeadForge team'}</div>
              <button className="secondary-button compact-button" onClick={() => openPage('welcome')} type="button">
                Welcome Page
              </button>
              {renderThemeToggle()}
              <button className="nav-cta" onClick={handleLogout} type="button">
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="dashboard-page-main">
          <div className="section-frame dashboard-intro">
            <span className="section-label">Dashboard</span>
            <h1 className="section-title">Welcome back, {user?.username || 'LeadForge team'}.</h1>
            <p className="section-copy">
              The welcome experience is now separate from the product workspace, while your existing authenticated
              lead management dashboard stays available behind login.
            </p>
          </div>

          <Dashboard />
        </main>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <Navbar
        activeSection={activeSection}
        ctaLabel={isAuthenticated ? 'Open Dashboard' : 'Sign Up'}
        ctaMobileLabel={isAuthenticated ? 'Open Dashboard' : 'Create Account'}
        isMenuOpen={mobileMenuOpen}
        isScrolled={isScrolled}
        onCta={isAuthenticated ? openDashboard : () => openAuthPage('signup')}
        onNavigate={(destination) => {
          if (destination === 'dashboard') {
            openDashboard();
            return;
          }
          navigateToSection(destination);
        }}
        onToggleMenu={() => setMobileMenuOpen((isOpen) => !isOpen)}
        onToggleTheme={toggleTheme}
        theme={theme}
      />

      <main className="site-main">
        <SectionReveal className="hero-section" id="home">
          <Hero
            leads={leads.slice(0, 4)}
            onPrimaryAction={() => openAuthPage('login')}
            onSecondaryAction={() => openAuthPage('signup')}
            primaryLabel={isAuthenticated ? 'Open Dashboard' : 'Log In'}
            secondaryLabel={isAuthenticated ? 'View Welcome Flow' : 'Create Account'}
          />
        </SectionReveal>

        <SectionReveal className="stats-section" id="dashboard">
          <StatsCards stats={stats} />
        </SectionReveal>

        <SectionReveal className="preview-section" id="leads">
          <LeadsPreview leads={leads.slice(0, 6)} />
        </SectionReveal>

        <SectionReveal className="actions-section" id="analytics">
          <QuickActions onNavigate={(destination) => (destination === 'dashboard' ? openDashboard() : navigateToSection(destination))} />
        </SectionReveal>
      </main>

      <SectionReveal as="footer" className="site-footer" trackSection={false}>
        <Footer onNavigate={(destination) => (destination === 'dashboard' ? openDashboard() : navigateToSection(destination))} />
      </SectionReveal>

      <button
        aria-label="Back to top"
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        type="button"
      >
        <ArrowUpIcon />
      </button>
    </div>
  );
}

export default App;
