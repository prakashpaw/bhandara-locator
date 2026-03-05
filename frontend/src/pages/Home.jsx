import { useEffect, useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import '../styles/Home.css'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

// Custom animated saffron marker
const createSaffronIcon = (isSelected = false) => L.divIcon({
  className: '',
  html: `
    <div class="custom-marker ${isSelected ? 'selected' : ''}">
      <div class="marker-pin">
        <div class="marker-inner">🍛</div>
      </div>
      <div class="marker-pulse"></div>
    </div>
  `,
  iconSize: [40, 50],
  iconAnchor: [20, 50],
  popupAnchor: [0, -50],
})

function FlyToMarker({ position }) {
  const map = useMap()
  useEffect(() => {
    if (position) {
      map.flyTo(position, 15, { duration: 1.2 })
    }
  }, [position, map])
  return null
}

function Home() {
  const [bhandaras, setBhandaras] = useState([])
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const markersRef = useRef({})

  useEffect(() => {
    fetch('http://3.6.90.129/api/bhandaras')
      .then(res => res.json())
      .then(data => {
        setBhandaras(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching bhandaras:', err)
        setLoading(false)
      })
  }, [])

  const filtered = bhandaras.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    (b.address && b.address.toLowerCase().includes(search.toLowerCase()))
  )

  const handleSelectCard = (b) => {
    setSelected(b)
    if (markersRef.current[b.id]) {
      markersRef.current[b.id].openPopup()
    }
  }

  const openGoogleMaps = (b) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${b.lat},${b.lng}`
    window.open(url, '_blank')
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '—'
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric'
    })
  }

  return (
    <div className="home-layout">

      {/* SIDEBAR */}
      <div className="map-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-title">
            <span className="sidebar-count">{filtered.length}</span>
            Bhandaras
          </div>
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              className="map-search"
              placeholder="Search name or area..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="search-clear" onClick={() => setSearch('')}>✕</button>
            )}
          </div>
        </div>

        <div className="sidebar-list">
          {loading ? (
            <div className="sidebar-empty">
              <div className="loading-dots">
                <span></span><span></span><span></span>
              </div>
              <p>Loading bhandaras...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="sidebar-empty">
              <div style={{ fontSize: '2rem', marginBottom: 8 }}>🍛</div>
              <p>No bhandaras found</p>
            </div>
          ) : (
            filtered.map((b, i) => (
              <div
                key={b.id}
                className={`sidebar-card ${selected?.id === b.id ? 'active' : ''}`}
                onClick={() => handleSelectCard(b)}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="sidebar-card-top">
                  <div className="sidebar-card-name">{b.name}</div>
                  <div className="sidebar-live-dot"></div>
                </div>
                <div className="sidebar-card-addr">📍 {b.address}</div>
                <div className="sidebar-card-meta">
                  <span>📅 {formatDate(b.date)}</span>
                  <span>⏰ {b.time || '—'}</span>
                </div>
                <div className="sidebar-card-actions">
                  <button
                    className="sidebar-directions"
                    onClick={(e) => { e.stopPropagation(); openGoogleMaps(b) }}
                  >
                    🗺️ Directions
                  </button>
                  <span className="sidebar-phone">📞 {b.contact}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* MAP */}
      <div className="map-area">
        <MapContainer
          center={[21.1458, 79.0882]}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {selected && selected.lat && selected.lng && (
            <FlyToMarker position={[parseFloat(selected.lat), parseFloat(selected.lng)]} />
          )}

          {filtered
            .filter(b => b.lat && b.lng)
            .map((b) => (
              <Marker
                key={b.id}
                position={[parseFloat(b.lat), parseFloat(b.lng)]}
                icon={createSaffronIcon(selected?.id === b.id)}
                ref={el => { if (el) markersRef.current[b.id] = el }}
                eventHandlers={{ click: () => setSelected(b) }}
              >
                <Popup className="custom-popup">
                  <div className="popup-content">
                    <div className="popup-name">{b.name}</div>
                    <div className="popup-desc">{b.description}</div>
                    <div className="popup-meta">
                      <span>📅 {formatDate(b.date)}</span>
                      <span>⏰ {b.time}</span>
                    </div>
                    <div className="popup-meta">
                      <span>📍 {b.address}</span>
                    </div>
                    <div className="popup-meta">
                      <span>📞 {b.contact}</span>
                    </div>
                    <button
                      className="popup-directions"
                      onClick={() => openGoogleMaps(b)}
                    >
                      🗺️ Open in Google Maps
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
        </MapContainer>

        <div className="map-stats-overlay">
          <div className="map-stat-pill">
            <div className="map-stat-dot"></div>
            {bhandaras.length} bhandaras listed
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
