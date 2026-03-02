import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
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

function Home() {
  const [bhandaras, setBhandaras] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/bhandaras')
      .then(res => res.json())
      .then(data => setBhandaras(data))
      .catch(err => console.error('Error fetching bhandaras:', err))
  }, [])

  return (
    <div className="home">
      <h2>📍 Bhandaras Near You</h2>
      <MapContainer center={[21.1458, 79.0882]} zoom={12} className="map">
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
  )
}

export default Home