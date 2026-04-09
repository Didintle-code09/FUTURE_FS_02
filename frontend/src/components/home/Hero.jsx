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
  const totalLeads = leads.length;
  const newLeads = leads.filter((lead) => lead.status === 'new').length;
  const activeSources = new Set(leads.map((lead) => lead.source).filter(Boolean)).size;
  const recentLeads = leads.slice(0, 4);

  return (
    <div className="section-frame hero-shell">
      <HeroBackground />

      <div className="hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            South Africa Ready CRM
          </span>
          <h1>Manage leads with clarity for South African teams.</h1>
          <p className="hero-subcopy">
            LeadNest gives small businesses, founders, and growing teams in South Africa a cleaner way to capture,
            organise, and follow up on real opportunities without clutter or guesswork.
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
              <strong>{totalLeads}</strong>
              <span>{totalLeads === 1 ? 'lead currently tracked' : 'leads currently tracked'}</span>
            </div>
            <div className="metric-chip">
              <strong>{newLeads}</strong>
              <span>{newLeads === 1 ? 'new lead needs attention' : 'new leads need attention'}</span>
            </div>
            <div className="metric-chip">
              <strong>{activeSources}</strong>
              <span>{activeSources === 1 ? 'active source in the pipeline' : 'active sources in the pipeline'}</span>
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
                  <span>South Africa pipeline snapshot</span>
                </div>
              </div>
              <span className="live-pill">Live</span>
            </div>

            <div className="hero-panel-stats">
              <div>
                <span>Total Leads</span>
                <strong>{totalLeads}</strong>
              </div>
              <div>
                <span>Tracked Sources</span>
                <strong>{activeSources}</strong>
              </div>
            </div>

            <div className="hero-lead-list">
              {recentLeads.length ? (
                recentLeads.map((lead) => (
                  <div className="hero-lead-row" key={lead.id || lead._id}>
                    <div className="hero-lead-copy">
                      <strong>{lead.name}</strong>
                      <span>{lead.company || 'South African business lead'}</span>
                    </div>
                    <div className={`status-pill status-${lead.status}`}>{lead.status}</div>
                  </div>
                ))
              ) : (
                <div className="hero-lead-row">
                  <div className="hero-lead-empty-copy">
                    <strong>No live leads yet</strong>
                    <span>Create your first lead to start building your pipeline.</span>
                  </div>
                  <div className="status-pill status-new">ready</div>
                </div>
              )}
            </div>
          </div>

          <div className="floating-insight panel-card">
            <span>Next best action</span>
            <strong>{recentLeads.length ? 'Keep your newest South African opportunities moving.' : 'Add your first lead and start building momentum.'}</strong>
            <p>
              {recentLeads.length
                ? 'Use the dashboard to update statuses, add notes, and keep every follow-up visible in one place.'
                : 'Once leads are added, this space will reflect the real activity in your pipeline instead of placeholder metrics.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
