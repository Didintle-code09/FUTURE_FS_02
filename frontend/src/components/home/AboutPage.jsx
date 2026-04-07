import LogoMark from './LogoMark.jsx';
import { ArrowRightIcon } from './Icons.jsx';

const founderFocus = [
  'Computer science',
  'Creative problem-solving',
  'Purposeful building',
  'Growth mindset',
];

const founderStory = [
  "I am Didintle Moratamotho, a 19-year-old computer science student at UWC with a strong desire to keep learning, creating, and growing through every project I take on.",
  "For me, technology is not only about code. It is also a creative outlet where ideas become real experiences that people can use, feel, and connect with.",
  "As a Moshal Scholar, I carry a mindset of discipline, resilience, and progress. I am navigating life with purpose and doing my best to turn creativity into something meaningful.",
];

function AboutPage({ onBackHome, onOpenDashboard, onOpenSignup, profile }) {
  return (
    <main className="about-page-main">
      <div className="section-frame about-hero">
        <section className="panel-card about-intro">
          <span className="section-label">About The Founder</span>

          <div className="about-title-row">
            <div className="about-logo-shell">
              <LogoMark />
            </div>
            <div>
              <h1>{profile.name}</h1>
              <p className="about-role">{profile.title}</p>
            </div>
          </div>

          <p className="about-copy">{profile.intro}</p>

          <div className="about-stat-grid">
            {profile.stats.map((stat) => (
              <div className="about-stat-card" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="about-actions">
            <button className="primary-button" onClick={onOpenDashboard} type="button">
              Go to Dashboard
              <ArrowRightIcon />
            </button>
            <button className="secondary-button" onClick={onOpenSignup} type="button">
              Create Account
            </button>
            <button className="text-action" onClick={onBackHome} type="button">
              Back to Welcome
            </button>
          </div>
        </section>

        <aside className="panel-card about-side-panel">
          <span className="about-side-label">Founder Perspective</span>
          <h2>Building software that feels useful, thoughtful, and real.</h2>
          <p>{profile.story}</p>
          <p>{profile.mission}</p>

          <div className="about-focus-grid">
            {founderFocus.map((item) => (
              <span className="about-focus-pill" key={item}>
                {item}
              </span>
            ))}
          </div>
        </aside>
      </div>

      <div className="section-frame about-grid">
        <section className="panel-card about-section about-story-card">
          <span className="section-label">Computer Science Student And Creative Builder</span>
          <h2>A story shaped by learning, creativity, and growth.</h2>

          <div className="about-story-flow">
            {founderStory.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="panel-card about-section about-mission-card">
          <span className="section-label">Why LeadNest</span>
          <h2>The vision behind the product.</h2>
          <p>
            LeadNest was born from a simple idea: the tools we use every day should inspire us, not slow us down. I wanted to build more than just a CRM; I wanted to create a workspace that feels intuitive, modern, and beautifully crafted—a place where you actually want to log in and do your best work.
          </p>

          <div className="about-quote-block">
            <strong>What matters most</strong>
            <p>
              Building meaningful digital experiences that turn everyday tasks into opportunities for growth.
            </p>
          </div>
        </section>
      </div>

      <div className="section-frame">
        <section className="panel-card about-highlights">
          <div className="section-copy-block about-highlights-copy">
            <span className="section-label">Talking Points</span>
            <h2 className="section-title">The values behind the journey.</h2>
            <p className="section-copy">
              These notes reflect the mindset, background, and personal direction shaping who I am as a student
              and aspiring builder.
            </p>
          </div>

          <div className="about-highlight-list">
            {profile.highlights.map((item) => (
              <article className="about-highlight-card" key={item}>
                <strong>Founder note</strong>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default AboutPage;
