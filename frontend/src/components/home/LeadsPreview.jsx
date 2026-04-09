function LeadsPreview({ leads }) {
  return (
    <div className="section-frame">
      <div className="section-copy-block">
        <span className="section-label">Recent Leads</span>
        <h2 className="section-title">Keep every South African client conversation moving without losing the details.</h2>
        <p className="section-copy">
          Stay on top of real opportunities with a clear view of who they are, where they came from, and what
          needs to happen next in your pipeline.
        </p>
      </div>

      <div className="panel-card leads-preview">
        <div className="table-header">
          <div>
            <h3>Latest pipeline activity</h3>
            <p>A clean overview of your current leads, their status, and where your team should focus next.</p>
          </div>
          <span className="table-pill">{leads.length ? `${leads.length} live lead${leads.length === 1 ? '' : 's'}` : 'No live leads yet'}</span>
        </div>

        {leads.length ? (
          <>
            <div className="desktop-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Source</th>
                    <th>Company</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id || lead._id}>
                      <td>
                        <div className="lead-identity">
                          <strong>{lead.name}</strong>
                          <span>{lead.phoneNumber || 'No phone number added'}</span>
                        </div>
                      </td>
                      <td>{lead.email}</td>
                      <td>
                        <span className={`status-pill status-${lead.status}`}>{lead.status}</span>
                      </td>
                      <td>{lead.source}</td>
                      <td>{lead.company || 'Independent / not added yet'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mobile-lead-cards">
              {leads.map((lead) => (
                <article className="mobile-lead-card" key={lead.id || lead._id}>
                  <div className="mobile-lead-topline">
                    <div className="mobile-lead-copy">
                      <strong>{lead.name}</strong>
                      <span>{lead.company || 'Independent / not added yet'}</span>
                    </div>
                    <span className={`status-pill status-${lead.status}`}>{lead.status}</span>
                  </div>
                  <div className="mobile-lead-meta">
                    <span>{lead.email}</span>
                    <span>{lead.source}</span>
                    <span>{lead.phoneNumber || 'No phone number added'}</span>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="preview-empty-state">
            <strong>No live leads to preview yet.</strong>
            <p>
              Once your team starts capturing leads, this section will show real pipeline activity instead of
              placeholder rows.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LeadsPreview;
