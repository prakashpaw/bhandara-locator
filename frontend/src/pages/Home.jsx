import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import '../styles/Home.css'

// Fix default marker icon broken in Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

// Dummy data — will come from backend later
const bhandaras = [
  {
    id: 1,
    name: "Sai Baba Bhandara",
    description: "Free langar for everyone",
    date: "2024-03-15",
    time: "12:00 PM",
    address: "Nagpur, Maharashtra",
    contact: "9876543210",
    lat: 21.1458,
    lng: 79.0882,
  },
  {
    id: 2,
    name: "Ram Navami Bhandara",
    description: "Prasad distribution",
    date: "2024-03-16",
    time: "11:00 AM",
    address: "Wardha Road, Nagpur",
    contact: "9123456780",
    lat: 21.1300,
    lng: 79.1200,
  }
]

function Home() {
  return (
    <div className="home">
      <h2>📍 Bhandaras Near You</h2>
      <MapContainer center={[21.1458, 79.0882]} zoom={12} className="map">
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {bhandaras.map((b) => (
          <Marker key={b.id} position={[b.lat, b.lng]}>
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