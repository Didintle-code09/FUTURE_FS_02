import { ChatIcon, SparkIcon, StackIcon, TrophyIcon } from './Icons.jsx';

const iconMap = {
  chat: ChatIcon,
  spark: SparkIcon,
  stack: StackIcon,
  trophy: TrophyIcon,
};

function StatsCards({ stats }) {
  return (
    <div className="section-frame">
      <div className="section-copy-block">
        <span className="section-label">Performance Snapshot</span>
        <h2 className="section-title">A homepage that feels like your command center.</h2>
        <p className="section-copy">
          Monitor the health of your funnel at a glance with bright, responsive cards that stay legible in both
          light and dark mode.
        </p>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => {
          const Icon = iconMap[stat.icon];

          return (
            <article className="panel-card stat-card" key={stat.label}>
              <div className="stat-icon">
                <Icon />
              </div>
              <div className="stat-content">
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
                <p>{stat.detail}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default StatsCards;
