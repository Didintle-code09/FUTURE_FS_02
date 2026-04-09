import LogoMark from './LogoMark.jsx';
import { ArrowRightIcon, CloseIcon, MenuIcon, MoonIcon, SunIcon } from './Icons.jsx';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'leads', label: 'Leads' },
  { id: 'analytics', label: 'Analytics' },
];

function Navbar({
  activeSection,
  ctaLabel = 'New Lead',
  ctaMobileLabel = 'Create New Lead',
  isMenuOpen,
  isScrolled,
  onCta,
  onMobileLogout,
  onNavigate,
  onToggleMenu,
  onToggleTheme,
  showMobileLogout = false,
  theme,
  themeMode,
}) {
  return (
    <>
      <header className={`navbar-shell ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="navbar">
          <button className="brand-lockup" onClick={() => onNavigate('home')} type="button">
            <LogoMark />
            <div className="brand-copy">
              <span className="brand-name">LeadNest</span>
              <span className="brand-tag">Close deals with clarity</span>
            </div>
          </button>

          <nav aria-label="Primary" className="navbar-links">
            {navItems.map((item) => (
              <button
                aria-current={activeSection === item.id ? 'page' : undefined}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                key={item.id}
                onClick={() => onNavigate(item.id)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="navbar-actions">
            <button className="nav-cta" onClick={onCta} type="button">
              {ctaLabel}
              <ArrowRightIcon />
            </button>

            <button
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="mobile-menu-toggle"
              onClick={onToggleMenu}
              type="button"
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-drawer-backdrop ${isMenuOpen ? 'open' : ''}`} onClick={onToggleMenu} role="presentation" />

      <aside className={`mobile-drawer ${isMenuOpen ? 'open' : ''}`} aria-hidden={!isMenuOpen}>
        <div className="mobile-drawer-header">
          <div className="brand-lockup">
            <LogoMark />
            <div className="brand-copy">
              <span className="brand-name">LeadNest</span>
              <span className="brand-tag">Track leads, grow smarter</span>
            </div>
          </div>

          <button aria-label="Close menu" className="mobile-menu-toggle" onClick={onToggleMenu} type="button">
            <CloseIcon />
          </button>
        </div>

        <nav aria-label="Mobile primary" className="mobile-drawer-nav">
          {navItems.map((item) => (
            <button
              className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
              key={item.id}
              onClick={() => onNavigate(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}

          {showMobileLogout && (
            <button className="mobile-nav-link" onClick={onMobileLogout} type="button">
              Logout
            </button>
          )}
        </nav>

        <div className="mobile-drawer-footer">
          <button className="theme-toggle full-width theme-toggle-drawer" onClick={onToggleTheme} type="button">
            <span>
              {themeMode === 'system'
                ? `Auto Theme (${theme})`
                : themeMode === 'dark'
                  ? 'Manual Dark Mode'
                  : 'Manual Light Mode'}
            </span>
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
          <button className="nav-cta full-width" onClick={onCta} type="button">
            {ctaMobileLabel}
            <ArrowRightIcon />
          </button>
        </div>
      </aside>
    </>
  );
}

export default Navbar;
