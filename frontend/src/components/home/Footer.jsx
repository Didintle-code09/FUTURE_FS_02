import { useState } from 'react';
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
      { label: 'Privacy Policy', action: 'privacy' },
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
  const [email, setEmail] = useState('');
  const [messageText, setMessageText] = useState('');
  const [status, setStatus] = useState('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_NEWSLETTER_ENDPOINT;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formspreeEndpoint) {
      setStatus('error');
      setFeedbackMessage('Add your Formspree endpoint to activate this contact form.');
      return;
    }

    setStatus('submitting');
    setFeedbackMessage('');

    try {
      const formData = new FormData(event.currentTarget);

      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      if (response.ok) {
        setEmail('');
        setMessageText('');
        setStatus('success');
        setFeedbackMessage('Thanks for reaching out. Your message has been sent.');
        event.currentTarget.reset();
        return;
      }

      const data = await response.json().catch(() => null);
      const errorMessage = Array.isArray(data?.errors)
        ? data.errors.map((item) => item.message).join(', ')
        : 'That did not go through. Please try again in a moment.';

      setStatus('error');
      setFeedbackMessage(errorMessage);
    } catch {
      setStatus('error');
      setFeedbackMessage('That did not go through. Check your internet connection and try again.');
    }
  };

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

          <form action={formspreeEndpoint || undefined} className="newsletter-form" method="POST" onSubmit={handleSubmit}>
            <label className="newsletter-label" htmlFor="newsletter-email">
              Send a message
            </label>
            <input name="source" type="hidden" value="LeadNest footer contact form" />
            <div className="newsletter-row">
              <input
                autoComplete="email"
                id="newsletter-email"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="team@leadnest.app"
                required
                type="email"
                value={email}
              />
            </div>
            <textarea
              className="newsletter-message"
              id="newsletter-message"
              name="message"
              onChange={(event) => setMessageText(event.target.value)}
              placeholder="Write your message here..."
              required
              rows="4"
              value={messageText}
            />
            <div className="newsletter-actions">
              <button disabled={status === 'submitting'} type="submit">
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
              <p className={`newsletter-feedback ${status === 'error' ? 'is-error' : status === 'success' ? 'is-success' : ''}`}>
                {feedbackMessage || (formspreeEndpoint ? 'Powered by Formspree.' : '')}
              </p>
            </div>
            <p className="newsletter-helper">Drop your email and message here and Formspree will send it through.</p>
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
