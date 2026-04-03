import LogoMark from './LogoMark.jsx';
import HeroBackground from './HeroBackground.jsx';
import { ArrowRightIcon } from './Icons.jsx';

function Hero({
  leads,
  onPrimaryAction,
  onSecondaryAction,
  primaryLabel = 'Go to Dashboard',
  secondaryLabel = 'Add New Lead',
}) {
  return (
    <div className="section-frame hero-shell">
      <HeroBackground />

      <div className="hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            LeadNest CRM
          </span>
          <h1>Manage Leads. Close Deals. Grow Faster.</h1>
          <p className="hero-subcopy">
            A simple CRM to track, organize, and convert your clients. LeadNest keeps every touchpoint visible,
            every opportunity prioritized, and every rep moving with confidence.
          </p>

          <div className="hero-actions">
            <button className="primary-button" onClick={onPrimaryAction} type="button">
              {primaryLabel}
              <ArrowRightIcon />
            </button>
            <button className="secondary-button" onClick={onSecondaryAction} type="button">
              {secondaryLabel}
            </button>
          </div>

          <div className="hero-metrics">
            <div className="metric-chip">
              <strong>31%</strong>
              <span>higher conversion velocity</span>
            </div>
            <div className="metric-chip">
              <strong>4.8h</strong>
              <span>average first response time</span>
            </div>
            <div className="metric-chip">
              <strong>API ready</strong>
              <span>GET /api/leads and POST /api/leads</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-orb hero-orb-one" />
          <div className="hero-orb hero-orb-two" />

          <div className="hero-panel panel-card">
            <div className="hero-panel-header">
              <div className="hero-panel-brand">
                <LogoMark />
                <div>
                  <p>LeadNest Pulse</p>
                  <span>Revenue pipeline snapshot</span>
                </div>
              </div>
              <span className="live-pill">Live</span>
            </div>

            <div className="hero-panel-stats">
              <div>
                <span>Pipeline Value</span>
                <strong>$118.4K</strong>
              </div>
              <div>
                <span>Win Probability</span>
                <strong>74%</strong>
              </div>
            </div>

            <div className="hero-lead-list">
              {leads.map((lead) => (
                <div className="hero-lead-row" key={lead.id}>
                  <div>
                    <strong>{lead.name}</strong>
                    <span>{lead.company}</span>
                  </div>
                  <div className={`status-pill status-${lead.status}`}>{lead.status}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="floating-insight panel-card">
            <span>Next best action</span>
            <strong>Follow up with Jordan and Sofia before 3 PM</strong>
            <p>Both leads crossed your engagement threshold after the latest outreach.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
