import { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard.jsx';
import LoginForm from './components/LoginForm.jsx';
import RegisterForm from './components/RegisterForm.jsx';
import AboutPage from './components/home/AboutPage.jsx';
import Footer from './components/home/Footer.jsx';
import Hero from './components/home/Hero.jsx';
import LeadsPreview from './components/home/LeadsPreview.jsx';
import LogoMark from './components/home/LogoMark.jsx';
import Navbar from './components/home/Navbar.jsx';
import PrivacyPolicyPage from './components/home/PrivacyPolicyPage.jsx';
import QuickActions from './components/home/QuickActions.jsx';
import SectionReveal from './components/home/SectionReveal.jsx';
import StatsCards from './components/home/StatsCards.jsx';
import { ArrowUpIcon } from './components/home/Icons.jsx';
import { aboutProfile } from './data/aboutProfile.js';
import { authAPI, leadsAPI } from './services/api';

const THEME_MODE_KEY = 'leadnest-theme-mode';

function App() {
  const [themeMode, setThemeMode] = useState('system');
  const [systemTheme, setSystemTheme] = useState('light');
  const [page, setPage] = useState('welcome');
  const [activeSection, setActiveSection] = useState('home');
  const [pendingSection, setPendingSection] = useState(null);
  const [dashboardAction, setDashboardAction] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [leads, setLeads] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = themeMode === 'system' ? systemTheme : themeMode;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateTheme = (event) => {
      setSystemTheme(event.matches ? 'dark' : 'light');
    };

    const savedThemeMode = localStorage.getItem(THEME_MODE_KEY);
    if (savedThemeMode === 'light' || savedThemeMode === 'dark' || savedThemeMode === 'system') {
      setThemeMode(savedThemeMode);
    }

    updateTheme(mediaQuery);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateTheme);
    } else {
      mediaQuery.addListener(updateTheme);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', updateTheme);
      } else {
        mediaQuery.removeListener(updateTheme);
      }
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(THEME_MODE_KEY, themeMode);
  }, [themeMode]);

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

  useEffect(() => {
    if (page !== 'welcome' || !pendingSection) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      const target = document.getElementById(pendingSection);

      if (!target) {
        return;
      }

      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setPendingSection(null);
    }, 120);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [page, pendingSection]);

  useEffect(() => {
    if (!isAuthenticated) {
      setLeads([]);
      return;
    }

    const loadLeads = async () => {
      try {
        const response = await leadsAPI.getAllLeads();
        setLeads(response.data.data || []);
      } catch {
        setLeads([]);
      }
    };

    loadLeads();
  }, [isAuthenticated]);

  const stats = [
    {
      label: 'Total Leads',
      value: leads.length,
      detail: leads.length ? 'Live records currently in your pipeline.' : 'Your pipeline is ready for its first lead.',
      icon: 'stack',
    },
    {
      label: 'New Leads',
      value: leads.filter((lead) => lead.status === 'new').length,
      detail: 'Fresh enquiries waiting for first contact.',
      icon: 'spark',
    },
    {
      label: 'Contacted Leads',
      value: leads.filter((lead) => lead.status === 'contacted').length,
      detail: 'People you have already reached out to.',
      icon: 'chat',
    },
    {
      label: 'Converted Leads',
      value: leads.filter((lead) => lead.status === 'converted').length,
      detail: 'Closed opportunities tracked in your workspace.',
      icon: 'trophy',
    },
  ];

  const openPage = (nextPage) => {
    setMobileMenuOpen(false);
    if (nextPage !== 'welcome') {
      setPendingSection(null);
    }
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

  const openDashboard = (nextAction = null) => {
    setDashboardAction(nextAction);

    if (isAuthenticated) {
      openPage('dashboard');
      return;
    }

    openAuthPage('login');
  };

  const navigateToSection = (sectionId) => {
    const target = document.getElementById(sectionId);

    if (!target && sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setMobileMenuOpen(false);
      return;
    }

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  const handleMarketingNavigation = (destination) => {
    if (destination === 'about') {
      openPage('about');
      return;
    }

    if (destination === 'privacy') {
      openPage('privacy');
      return;
    }

    if (destination === 'dashboard') {
      openDashboard();
      return;
    }

    if (destination === 'add-lead') {
      openDashboard('add-lead');
      return;
    }

    if (destination === 'export-data') {
      openDashboard('export-data');
      return;
    }

    if (page !== 'welcome') {
      setPendingSection(destination === 'home' ? null : destination);
      openPage('welcome');
      return;
    }

    navigateToSection(destination);
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

  const toggleTheme = () => {
    setThemeMode((currentMode) => {
      if (currentMode === 'system') {
        return theme === 'light' ? 'dark' : 'light';
      }

      if (currentMode === 'dark') {
        return 'light';
      }

      return 'system';
    });
  };

  const renderNavbar = ({ activeSection: navbarActiveSection = '', ctaLabel, ctaMobileLabel, onCta }) => (
    <Navbar
      activeSection={navbarActiveSection}
      ctaLabel={ctaLabel}
      ctaMobileLabel={ctaMobileLabel}
      isMenuOpen={mobileMenuOpen}
      isScrolled={isScrolled}
      onCta={onCta}
      onNavigate={handleMarketingNavigation}
      onToggleMenu={() => setMobileMenuOpen((isOpen) => !isOpen)}
      onToggleTheme={toggleTheme}
      theme={theme}
      themeMode={themeMode}
    />
  );

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-panel panel-card">
          <LogoMark />
          <h1>Loading LeadNest</h1>
          <p>Checking your workspace and preparing the right next step.</p>
        </div>
      </div>
    );
  }

  if (page === 'login' || page === 'signup') {
    const isLoginPage = page === 'login';

    return (
      <div className="auth-page">
        {renderNavbar({
          ctaLabel: 'Welcome Page',
          ctaMobileLabel: 'Welcome Page',
          onCta: () => openPage('welcome'),
        })}

        <main className="auth-page-main">
          <div className="section-frame auth-layout">
            <section className="panel-card auth-aside">
              <span className="section-label">{isLoginPage ? 'Welcome Back' : 'Create Account'}</span>
              <h1>{isLoginPage ? 'Log in to your dashboard and pick up where you left off.' : 'Sign up and move from interest to revenue faster.'}</h1>
              <p>
                {isLoginPage
                  ? ''
                  : 'Create an account to unlock the authenticated dashboard, lead management tools, and the workflow engine behind LeadNest.'}
              </p>

              <div className="auth-feature-list">
                <div className="auth-feature-item">
                  <strong>Centralized worskpace</strong>
                  <span>All your leads, notes, and tasks organized in one clean dashboard.</span>
                </div>
                <div className="auth-feature-item">
                  <strong>Smart Analytics</strong>
                  <span>Gain instant insights into your conversion rates and pipeline health.</span>
                </div>
                <div className="auth-feature-item">
                  <strong>Work your way</strong>
                  <span>A beautiful interface that adapts to you, complete with automatic dark mode.</span>
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

  if (page === 'about') {
    return (
      <div className="about-page">
        {renderNavbar({
          activeSection: 'about',
          ctaLabel: 'Welcome Page',
          ctaMobileLabel: 'Welcome Page',
          onCta: () => openPage('welcome'),
        })}

        <AboutPage
          onBackHome={() => openPage('welcome')}
          onOpenDashboard={openDashboard}
          onOpenSignup={() => openAuthPage('signup')}
          profile={aboutProfile}
        />

        <SectionReveal as="footer" className="site-footer" trackSection={false}>
          <Footer onNavigate={handleMarketingNavigation} />
        </SectionReveal>
      </div>
    );
  }

  if (page === 'privacy') {
    return (
      <div className="about-page">
        {renderNavbar({
          ctaLabel: 'Welcome Page',
          ctaMobileLabel: 'Welcome Page',
          onCta: () => openPage('welcome'),
        })}

        <PrivacyPolicyPage
          onBackHome={() => openPage('welcome')}
          onOpenDashboard={openDashboard}
        />

        <SectionReveal as="footer" className="site-footer" trackSection={false}>
          <Footer onNavigate={handleMarketingNavigation} />
        </SectionReveal>
      </div>
    );
  }

  if (page === 'dashboard' && isAuthenticated) {
    return (
      <div className="dashboard-page">
        {renderNavbar({
          activeSection: 'dashboard',
          ctaLabel: 'Logout',
          ctaMobileLabel: 'Logout',
          onCta: handleLogout,
        })}

        <main className="dashboard-page-main">
          <div className="section-frame dashboard-intro">
            <span className="section-label">Dashboard</span>
            <h1 className="section-title">Welcome, {user?.username || 'LeadNest team'}.</h1>
            <p className="section-copy">
              You are now logged in and can access your authenticated CRM workspace.
            </p>
          </div>

          <Dashboard
            launchAction={dashboardAction}
            onActionHandled={() => setDashboardAction(null)}
          />
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
        onNavigate={handleMarketingNavigation}
        onToggleMenu={() => setMobileMenuOpen((isOpen) => !isOpen)}
        onToggleTheme={toggleTheme}
        theme={theme}
        themeMode={themeMode}
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
          <QuickActions leads={leads} onNavigate={handleMarketingNavigation} />
        </SectionReveal>
      </main>

      <SectionReveal as="footer" className="site-footer" trackSection={false}>
        <Footer onNavigate={handleMarketingNavigation} />
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
