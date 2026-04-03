import { AnalyticsIcon, DashboardIcon, ExportIcon, LeadsIcon } from './Icons.jsx';

const actions = [
  {
    title: 'Add Lead',
    description: 'Start a new pipeline record, assign ownership, and capture source details.',
    icon: LeadsIcon,
    action: 'leads',
    buttonLabel: 'Open Lead Queue',
  },
  {
    title: 'View All Leads',
    description: 'Jump straight into the latest opportunities and keep your momentum high.',
    icon: DashboardIcon,
    action: 'dashboard',
    buttonLabel: 'See Dashboard',
  },
  {
    title: 'Export Data',
    description: 'Preview the CSV export experience and reporting workflow for revenue ops.',
    icon: ExportIcon,
    action: 'analytics',
    buttonLabel: 'Preview Export UI',
  },
];

function QuickActions({ onNavigate }) {
  return (
    <div className="section-frame quick-actions-grid">
      <div className="section-copy-block">
        <span className="section-label">Quick Actions</span>
        <h2 className="section-title">Built to feel production-ready on day one.</h2>
        <p className="section-copy">
          Use this section as the bridge between your polished landing page and the workflows your team will run
          every day.
        </p>

        <div className="action-grid">
          {actions.map((item) => {
            const Icon = item.icon;

            return (
              <article className="panel-card action-card" key={item.title}>
                <div className="action-icon">
                  <Icon />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <button className="text-action" onClick={() => onNavigate(item.action)} type="button">
                  {item.buttonLabel}
                </button>
              </article>
            );
          })}
        </div>
      </div>

      <aside className="panel-card analytics-panel">
        <div className="analytics-panel-header">
          <div className="action-icon">
            <AnalyticsIcon />
          </div>
          <div>
            <span className="analytics-label">Pipeline Intelligence</span>
            <h3>Everything is staged for backend integration.</h3>
          </div>
        </div>

        <div className="analytics-stack">
          <div className="analytics-row">
            <span>Inbound to contacted</span>
            <strong>68%</strong>
          </div>
          <div className="progress-rail">
            <span style={{ width: '68%' }} />
          </div>

          <div className="analytics-row">
            <span>Meeting to proposal</span>
            <strong>54%</strong>
          </div>
          <div className="progress-rail">
            <span style={{ width: '54%' }} />
          </div>

          <div className="analytics-row">
            <span>Proposal to close</span>
            <strong>31%</strong>
          </div>
          <div className="progress-rail">
            <span style={{ width: '31%' }} />
          </div>
        </div>

        <div className="endpoint-list">
          <div className="endpoint-pill">
            <span>GET</span>
            <code>/api/leads</code>
          </div>
          <div className="endpoint-pill">
            <span>POST</span>
            <code>/api/leads</code>
          </div>
        </div>

        <p className="analytics-footnote">
          The homepage is using mock data for now, but the structure is already aligned to your existing API
          service layer.
        </p>
      </aside>
    </div>
  );
}

export default QuickActions;
