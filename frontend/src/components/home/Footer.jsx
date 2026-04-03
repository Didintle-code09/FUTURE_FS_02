import LogoMark from './LogoMark.jsx';
import { FacebookIcon, GitHubIcon, InstagramIcon, LinkedInIcon } from './Icons.jsx';

const footerGroups = [
  {
    title: 'Product',
    links: [
      { label: 'Dashboard', action: 'dashboard' },
      { label: 'Features', action: 'analytics' },
      { label: 'Pricing', action: 'home' },
      { label: 'Integrations', action: 'leads' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', action: 'about' },
      { label: 'Contact', action: 'analytics' },
      { label: 'Support', action: 'analytics' },
      { label: 'Privacy Policy', action: 'home' },
    ],
  },
];

const socialLinks = [
  { href: 'https://github.com/Didintle-code09', label: 'GitHub', icon: GitHubIcon },
  { href: 'https://www.linkedin.com/in/didintle-moratamotho-695196374/', label: 'LinkedIn', icon: LinkedInIcon },
  { href: 'https://www.facebook.com/share/1CQJREKgfM/', label: 'Facebook', icon: FacebookIcon },
  { href: 'https://www.instagram.com/didintle.asf?igsh=MWs5MDZ3MmNuZmlnaw==', label: 'Instagram', icon: InstagramIcon },
];

function Footer({ onNavigate }) {
  return (
    <div className="section-frame footer-frame">
      <div className="footer-divider" />

      <div className="footer-grid">
        <div className="footer-brand">
          <div className="brand-lockup footer-brand-lockup">
            <LogoMark />
            <div className="brand-copy">
              <span className="brand-name">LeadNest</span>
              <span className="brand-tag">Track leads, close deals, grow smarter.</span>
            </div>
          </div>

          <p>
            Built for modern sales teams who want a clean CRM experience, premium interactions, and a homepage
            that feels ready to ship.
          </p>

          <form className="newsletter-form">
            <label className="newsletter-label" htmlFor="newsletter-email">
              Stay in the loop
            </label>
            <div className="newsletter-row">
              <input id="newsletter-email" placeholder="team@leadnest.app" type="email" />
              <button type="button">Join</button>
            </div>
          </form>
        </div>

        {footerGroups.map((group) => (
          <div className="footer-column" key={group.title}>
            <h3>{group.title}</h3>
            <div className="footer-links">
              {group.links.map((link) => (
                <button key={link.label} onClick={() => onNavigate(link.action)} type="button">
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="footer-column">
          <h3>Social</h3>
          <div className="footer-links social-links">
            {socialLinks.map((link) => {
              const Icon = link.icon;

              return (
                <a href={link.href} key={link.label} rel="noreferrer" target="_blank">
                  <span className="social-icon">
                    <Icon />
                  </span>
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Built with LeadNest CRM</p>
        <p>Copyright 2026 LeadNest. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
