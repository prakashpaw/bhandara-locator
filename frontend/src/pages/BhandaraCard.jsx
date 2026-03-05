import '../styles/BhandaraCard.css'

function BhandaraCard({ bhandara, index = 0 }) {
  return (
    <div className="bhandara-card" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="card-badge">
        <div className="live-dot"></div>
        Listed
      </div>
      <div className="card-name">{bhandara.name}</div>
      <div className="card-desc">{bhandara.description}</div>
      <div className="card-meta">
        <div className="meta-item">
          <div className="meta-icon">📅</div>
          {bhandara.date ? new Date(bhandara.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
        </div>
        <div className="meta-item">
          <div className="meta-icon">⏰</div>
          {bhandara.time || '—'}
        </div>
        <div className="meta-item">
          <div className="meta-icon">📍</div>
          {bhandara.address}
        </div>
        <div className="meta-item">
          <div className="meta-icon">📞</div>
          {bhandara.contact}
        </div>
      </div>
      <div className="card-footer">
        <span className="dist-badge">📌 {bhandara.lat && bhandara.lng ? `${parseFloat(bhandara.lat).toFixed(3)}, ${parseFloat(bhandara.lng).toFixed(3)}` : 'Location set'}</span>
        <button className="directions-btn">Directions →</button>
      </div>
    </div>
  )
}

export default BhandaraCard
