import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import '../styles/Home.css'
import BhandaraCard from '../components/BhandaraCard'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

function Home() {
  const [bhandaras, setBhandaras] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://3.6.90.129/api/bhandaras')
      .then(res => res.json())
      .then(data => setBhandaras(data))
      .catch(err => console.error('Error fetching bhandaras:', err))
  }, [])

  return (
    <div className="home">
      <div className="hero">
        <div className="hero-text">
          <h1>Find free meals<br/>near <span>you</span></h1>
          <p>Discover bhandaras and community meals happening around you. Free food, open to everyone — no questions asked.</p>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-num">{bhandaras.length || 0}</div>
              <div className="stat-label">Total Listed</div>
            </div>
            <div className="stat">
              <div className="stat-num">Free</div>
              <div className="stat-label">Always</div>
            </div>
            <div className="stat">
              <div className="stat-num">All</div>
              <div className="stat-label">Welcome</div>
            </div>
          </div>
          <div className="hero-actions">
            <button className="btn-primary">📍 Find Near Me</button>
            <button className="btn-secondary" onClick={() => navigate('/list')}>Browse All</button>
          </div>
        </div>

        <div className="map-container">
          <MapContainer center={[21.1458, 79.0882]} zoom={12} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {bhandaras.map((b) => (
              <Marker key={b.id} position={[parseFloat(b.lat), parseFloat(b.lng)]}>
                <Popup>
                  <strong>{b.name}</strong><br />
                  {b.description}<br />
                  📅 {b.date} ⏰ {b.time}<br />
                  📍 {b.address}<br />
                  📞 {b.contact}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      <div className="nearby-section">
        <div className="section-header">
          <div className="section-title">Recently Added</div>
          <button className="see-all" onClick={() => navigate('/list')}>See all →</button>
        </div>
        <div className="cards-row">
          {bhandaras.slice(0, 3).map((b, i) => (
            <BhandaraCard key={b.id} bhandara={b} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
