import { AnalyticsIcon, DashboardIcon, ExportIcon, LeadsIcon } from './Icons.jsx';

const actions = [
  {
    title: 'Add Lead',
    description: 'Capture a new lead in seconds and keep every opportunity organised from first contact onward.',
    icon: LeadsIcon,
    action: 'add-lead',
    buttonLabel: 'Add a Lead',
  },
  {
    title: 'View All Leads',
    description: 'See every opportunity in one place and focus on the leads that need action next.',
    icon: DashboardIcon,
    action: 'dashboard',
    buttonLabel: 'View Pipeline',
  },
  {
    title: 'Export Data',
    description: 'Export your lead data for reporting, handoff, or sharing with clients and collaborators.',
    icon: ExportIcon,
    action: 'export-data',
    buttonLabel: 'Export Insights',
  },
];

function QuickActions({ leads, onNavigate }) {
  const totalLeads = leads.length;
  const newLeads = leads.filter((lead) => lead.status === 'new').length;
  const contactedLeads = leads.filter((lead) => lead.status === 'contacted').length;
  const convertedLeads = leads.filter((lead) => lead.status === 'converted').length;
  const safeWidth = (count) => (totalLeads ? (count / totalLeads) * 100 : 0);

  return (
    <div className="section-frame quick-actions-grid">
      <div className="section-copy-block">
        <span className="section-label">Quick Actions</span>
        <h2 className="section-title">Everything your team needs to move faster in one place.</h2>
        <p className="section-copy">
          From capturing new prospects to tracking progress and reporting results, LeadNest keeps your sales work
          organised and easy to act on for South African teams and growing businesses.
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
            <span className="analytics-label">Pipeline View</span>
            <h3>See the live breakdown of your actual pipeline.</h3>
          </div>
        </div>

        {totalLeads ? (
          <div className="analytics-stack">
            <div className="analytics-row">
              <span>New leads</span>
              <strong>{newLeads}</strong>
            </div>
            <div className="progress-rail">
              <span style={{ width: `${safeWidth(newLeads)}%` }} />
            </div>

            <div className="analytics-row">
              <span>Contacted leads</span>
              <strong>{contactedLeads}</strong>
            </div>
            <div className="progress-rail">
              <span style={{ width: `${safeWidth(contactedLeads)}%` }} />
            </div>

            <div className="analytics-row">
              <span>Converted leads</span>
              <strong>{convertedLeads}</strong>
            </div>
            <div className="progress-rail">
              <span style={{ width: `${safeWidth(convertedLeads)}%` }} />
            </div>
          </div>
        ) : (
          <div className="analytics-empty-state">
            <strong>No live pipeline data yet.</strong>
            <p>Add your first lead and this panel will start reflecting your real activity.</p>
          </div>
        )}

        <div className="endpoint-list">
          <div className="endpoint-pill">
            <span>South Africa</span>
            <code>Local workflow</code>
          </div>
          <div className="endpoint-pill">
            <span>Real</span>
            <code>Live pipeline data</code>
          </div>
        </div>

        <p className="analytics-footnote">
          LeadNest helps your team stay organised, respond faster, and work from actual pipeline activity instead
          of inflated dashboard numbers.
        </p>
      </aside>
    </div>
  );
}

export default QuickActions;
