function PrivacyPolicyPage({ onBackHome, onOpenDashboard }) {
  return (
    <main className="privacy-page-main">
      <div className="section-frame">
        <section className="panel-card privacy-hero">
          <span className="section-label">Privacy Policy</span>
          <h1>Privacy information for this South Africa-based LeadNest site.</h1>
          <p className="privacy-copy">
            This page is a factual summary of how the current LeadNest app handles information based on the code
            and services connected to this project.
          </p>

          <div className="privacy-actions">
            <button className="primary-button" onClick={onOpenDashboard} type="button">
              Go to Dashboard
            </button>
            <button className="text-action" onClick={onBackHome} type="button">
              Back to Welcome
            </button>
          </div>
        </section>
      </div>

      <div className="section-frame privacy-grid">
        <section className="panel-card privacy-section">
          <h2>What LeadNest currently collects</h2>
          <p>
            When you create an account, the app collects your username, email address, and password. When you use
            the CRM, it can store lead information such as name, email address, phone number, company, source,
            status, and notes.
          </p>
          <p>
            The footer contact form collects the email address and message that you type into that form before
            sending it to Formspree.
          </p>
        </section>

        <section className="panel-card privacy-section">
          <h2>How that information is used</h2>
          <p>
            Account information is used to register users, sign them in, and identify the currently logged-in
            user. Lead information is used to display, update, and organise your CRM pipeline inside the app.
          </p>
          <p>
            Contact-form information is used only to deliver your message through the connected Formspree form.
          </p>
        </section>

        <section className="panel-card privacy-section">
          <h2>Services connected to this app</h2>
          <p>
            Authentication is connected to Supabase Auth through the backend API. Lead data is stored in Supabase.
            The contact form is sent through Formspree. These services may process the information needed to carry
            out those functions.
          </p>
        </section>

        <section className="panel-card privacy-section">
          <h2>Browser storage</h2>
          <p>
            The current app stores your login token in browser local storage so that your session can remain active
            between refreshes. It also stores your theme preference in local storage.
          </p>
        </section>

        <section className="panel-card privacy-section">
          <h2>What the current code does not appear to use</h2>
          <p>
            Based on the current project code, LeadNest does not run its own analytics, advertising trackers, or
            profiling tools. It also does not use application cookies for sign-in; the visible session handling in
            this codebase relies on local storage.
          </p>
        </section>

        <section className="panel-card privacy-section">
          <h2>Your control over data in the app</h2>
          <p>
            You can create, edit, and delete leads from the dashboard. Logging out removes the stored auth token
            from your browser. If you send a message through the footer form, that submission is handled through
            Formspree rather than stored as a lead record in the CRM.
          </p>
        </section>
      </div>

      <div className="section-frame">
        <section className="panel-card privacy-note">
          <strong>Last updated</strong>
          <p>3 April 2026</p>
          <p>
            This page is written as a plain-language summary of the current app behaviour and is not legal advice.
          </p>
        </section>
      </div>
    </main>
  );
}

export default PrivacyPolicyPage;
