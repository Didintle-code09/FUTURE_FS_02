const particles = [
  { left: '6%', top: '16%', size: '0.55rem', duration: '16s', delay: '-4s' },
  { left: '14%', top: '68%', size: '0.72rem', duration: '19s', delay: '-9s' },
  { left: '22%', top: '34%', size: '0.48rem', duration: '15s', delay: '-2s' },
  { left: '36%', top: '12%', size: '0.62rem', duration: '18s', delay: '-7s' },
  { left: '44%', top: '76%', size: '0.82rem', duration: '21s', delay: '-11s' },
  { left: '57%', top: '24%', size: '0.5rem', duration: '17s', delay: '-5s' },
  { left: '63%', top: '58%', size: '0.68rem', duration: '20s', delay: '-8s' },
  { left: '74%', top: '18%', size: '0.58rem', duration: '14s', delay: '-3s' },
  { left: '79%', top: '74%', size: '0.9rem', duration: '22s', delay: '-10s' },
  { left: '88%', top: '38%', size: '0.52rem', duration: '16s', delay: '-6s' },
];

function HeroBackground() {
  return (
    <div aria-hidden="true" className="hero-video-bg">
      <div className="hero-video-mesh" />
      <div className="hero-video-gridlines" />
      <div className="hero-video-beam beam-one" />
      <div className="hero-video-beam beam-two" />
      <div className="hero-video-glow glow-one" />
      <div className="hero-video-glow glow-two" />
      <div className="hero-video-glow glow-three" />
      <div className="hero-video-rings" />

      <div className="hero-video-particles">
        {particles.map((particle) => (
          <span
            className="hero-particle"
            key={`${particle.left}-${particle.top}`}
            style={{
              '--particle-left': particle.left,
              '--particle-top': particle.top,
              '--particle-size': particle.size,
              '--particle-duration': particle.duration,
              '--particle-delay': particle.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroBackground;
