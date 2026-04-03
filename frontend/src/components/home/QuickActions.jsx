import { AnalyticsIcon, DashboardIcon, ExportIcon, LeadsIcon } from './Icons.jsx';

const actions = [
  {
    title: 'Add Lead',
    description: 'Create a new lead in seconds, assign an owner, and keep every deal moving forward.',
    icon: LeadsIcon,
    action: 'leads',
    buttonLabel: 'Add a Lead',
  },
  {
    title: 'View All Leads',
    description: 'See every opportunity in one place and focus on the leads most likely to convert.',
    icon: DashboardIcon,
    action: 'dashboard',
    buttonLabel: 'View Pipeline',
  },
  {
    title: 'Export Data',
    description: 'Export your lead data for reporting, handoff, or sharing with the rest of your team.',
    icon: ExportIcon,
    action: 'analytics',
    buttonLabel: 'Export Insights',
  },
];

function QuickActions({ onNavigate }) {
  return (
    <div className="section-frame quick-actions-grid">
      <div className="section-copy-block">
        <span className="section-label">Quick Actions</span>
        <h2 className="section-title">Everything your team needs to move faster.</h2>
        <p className="section-copy">
          From capturing new prospects to tracking progress and reporting results, LeadNest keeps your sales work
          organized and easy to act on.
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
            <h3>See exactly where your pipeline is gaining momentum.</h3>
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
            <span>Fast</span>
            <code>Lead capture</code>
          </div>
          <div className="endpoint-pill">
            <span>Clear</span>
            <code>Sales visibility</code>
          </div>
        </div>

        <p className="analytics-footnote">
          LeadNest helps your team respond faster, stay organized, and turn more opportunities into closed deals.
        </p>
      </aside>
    </div>
  );
}

export default QuickActions;
