import API from '../api'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/BhandaraList.css'

function BhandaraList() {
  const [bhandaras, setBhandaras] = useState([])
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetch(API + '/api/bhandaras')
      .then(res => res.json())
      .then(data => setBhandaras(data))
      .catch(err => console.error('Error:', err))
  }, [])

  const filtered = bhandaras.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.address.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="list-page">
      <h1 className="page-heading">All Bhandaras</h1>
      <p className="page-sub">Browse all community meals in your area</p>

      <div className="search-bar">
        <input
          className="search-input"
          placeholder="Search by name or location..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="filter-btn">📅 Date</button>
        <button className="filter-btn" onClick={() => navigate('/add')}>+ Add New</button>
      </div>

      <div className="list-grid">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <h3>No bhandaras found</h3>
            <p>Try a different search or add one!</p>
          </div>
        ) : (
          filtered.map((b, i) => (
            <div className="list-card" key={b.id} style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="list-card-left">
                <div className="list-card-name">{b.name}</div>
                <div className="list-card-desc">{b.description}</div>
                <div className="list-card-tags">
                  <span className="tag">
                    📅 {b.date ? new Date(b.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '—'}
                  </span>
                  <span className="tag">⏰ {b.time || '—'}</span>
                  <span className="tag">📍 {b.address}</span>
                  <span className="tag">📞 {b.contact}</span>
                </div>
              </div>
              <div className="list-card-right">
                <div className="card-badge" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  background: 'var(--saffron-glow)', border: '1px solid rgba(255,107,0,0.2)',
                  color: 'var(--saffron)', fontSize: '0.7rem', fontWeight: 600,
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                  padding: '3px 8px', borderRadius: '4px'
                }}>
                  <div style={{ width: 5, height: 5, background: 'var(--saffron)', borderRadius: '50%', animation: 'pulse 1.5s infinite' }}></div>
                  Active
                </div>
                <button className="directions-btn" style={{
                  fontSize: '0.75rem', color: 'var(--saffron)', background: 'var(--saffron-glow)',
                  border: '1px solid rgba(255,107,0,0.2)', padding: '4px 10px',
                  borderRadius: '5px', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif'
                }}>
                  Directions →
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default BhandaraList
