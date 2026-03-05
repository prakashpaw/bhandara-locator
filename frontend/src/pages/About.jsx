import '../styles/About.css'

function About() {
  const stack = [
    { icon: '⚛️', name: 'React' },
    { icon: '🟩', name: 'Node.js' },
    { icon: '🐘', name: 'PostgreSQL' },
    { icon: '🐳', name: 'Docker Swarm' },
    { icon: '🏗️', name: 'Terraform' },
    { icon: '☁️', name: 'AWS' },
    { icon: '📊', name: 'Grafana' },
    { icon: '🔥', name: 'Prometheus' },
  ]

  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="about-tag">Open Source · Free Forever</div>
        <h1 className="about-title">Food is<br/>for everyone.</h1>
        <p className="about-body">
          Bhandara Locator was built to connect people with free community meals happening around them.
          Whether it's a temple langar, a Ram Navami mahaprasad, or a neighbourhood seva — no one should
          go hungry when there's food nearby.
          <br /><br />
          This website is created by Prakash Pawar.
        </p>
      </div>

      <div className="tech-section-title">Built With</div>
      <div className="tech-grid">
        {stack.map((t) => (
          <div className="tech-card" key={t.name}>
            <div className="tech-icon">{t.icon}</div>
            <div className="tech-name">{t.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default About
