function LeadsPreview({ leads }) {
  return (
    <div className="section-frame">
      <div className="section-copy-block">
        <span className="section-label">Recent Leads</span>
        <h2 className="section-title">Keep every conversation moving without losing the details.</h2>
        <p className="section-copy">
          This preview is powered by sample data today and structured to swap directly to your backend list view
          tomorrow.
        </p>
      </div>

      <div className="panel-card leads-preview">
        <div className="table-header">
          <div>
            <h3>Latest pipeline activity</h3>
            <p>Ready to connect to GET /api/leads when your live data is available.</p>
          </div>
          <span className="table-pill">Updated 2 minutes ago</span>
        </div>

        <div className="desktop-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Source</th>
                <th>Owner</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>
                    <div className="lead-identity">
                      <strong>{lead.name}</strong>
                      <span>{lead.company}</span>
                    </div>
                  </td>
                  <td>{lead.email}</td>
                  <td>
                    <span className={`status-pill status-${lead.status}`}>{lead.status}</span>
                  </td>
                  <td>{lead.source}</td>
                  <td>{lead.owner}</td>
                  <td>{lead.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mobile-lead-cards">
          {leads.map((lead) => (
            <article className="mobile-lead-card" key={lead.id}>
              <div className="mobile-lead-topline">
                <div>
                  <strong>{lead.name}</strong>
                  <span>{lead.company}</span>
                </div>
                <span className={`status-pill status-${lead.status}`}>{lead.status}</span>
              </div>
              <div className="mobile-lead-meta">
                <span>{lead.email}</span>
                <span>{lead.source}</span>
                <span>{lead.owner}</span>
                <span>{lead.value}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeadsPreview;
