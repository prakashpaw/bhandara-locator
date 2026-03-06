import { useEffect, useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import '../styles/Home.css'
import API from '../api'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({ iconRetinaUrl: markerIcon2x, iconUrl: markerIcon, shadowUrl: markerShadow })

const createSaffronIcon = (isSelected = false) => L.divIcon({
  className: '',
  html: `<div class="custom-marker ${isSelected ? 'selected' : ''}">
    <div class="marker-pin"><div class="marker-inner">🍛</div></div>
    <div class="marker-pulse"></div>
  </div>`,
  iconSize: [40, 50], iconAnchor: [20, 50], popupAnchor: [0, -50],
})

function FlyToMarker({ position }) {
  const map = useMap()
  useEffect(() => { if (position) map.flyTo(position, 15, { duration: 1.2 }) }, [position, map])
  return null
}

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-line title"></div>
      <div className="skeleton-line sub"></div>
      <div className="skeleton-line meta"></div>
      <div className="skeleton-line btn"></div>
    </div>
  )
}

function Home() {
  const [bhandaras, setBhandaras] = useState([])
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [filter, setFilter] = useState('all')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const markersRef = useRef({})
  const token = localStorage.getItem('token')
  const isAdmin = !!token

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500) }

  const fetchBhandaras = () => {
    fetch(`${API}/api/bhandaras`)
      .then(res => res.json())
      .then(data => { setBhandaras(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { fetchBhandaras() }, [])

  const isToday = (dateStr) => {
    if (!dateStr) return false
    const d = new Date(dateStr), today = new Date()
    return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear()
  }

  const filtered = bhandaras
    .filter(b => filter === 'today' ? isToday(b.date) : true)
    .filter(b => b.name.toLowerCase().includes(search.toLowerCase()) || (b.address && b.address.toLowerCase().includes(search.toLowerCase())))

  const todayCount = bhandaras.filter(b => isToday(b.date)).length

  const handleSelectCard = (b) => { setSelected(b); setSidebarOpen(false); if (markersRef.current[b.id]) markersRef.current[b.id].openPopup() }

  const handleDelete = async (id, e) => {
    if (e) e.stopPropagation()
    if (!window.confirm('Delete this bhandara?')) return
    try {
      const res = await fetch(`${API}/api/bhandaras/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
      if (res.ok) { setBhandaras(prev => prev.filter(b => b.id !== id)); if (selected?.id === id) setSelected(null); showToast('🗑️ Bhandara deleted') }
    } catch { showToast('❌ Delete failed') }
  }

  const startEdit = (b, e) => {
    e.stopPropagation()
    setEditingId(b.id)
    setEditForm({ name: b.name, description: b.description, date: b.date?.split('T')[0] || '', time: b.time, address: b.address, contact: b.contact, lat: b.lat, lng: b.lng })
  }

  const handleEditSave = async (id, e) => {
    e.stopPropagation()
    try {
      const res = await fetch(`${API}/api/bhandaras/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(editForm) })
      if (res.ok) { const updated = await res.json(); setBhandaras(prev => prev.map(b => b.id === id ? updated : b)); setEditingId(null); showToast('✅ Bhandara updated!') }
    } catch { showToast('❌ Update failed') }
  }

  const handleShare = (b, e) => {
    if (e) e.stopPropagation()
    const text = `🍛 ${b.name}\n📍 ${b.address}\n📅 ${formatDate(b.date)} ⏰ ${b.time}\nFind it on Bhandara Locator: ${API}`
    if (navigator.share) navigator.share({ title: b.name, text })
    else { navigator.clipboard.writeText(text); showToast('🔗 Copied to clipboard!') }
  }

  const openGoogleMaps = (b) => window.open(`https://www.google.com/maps/dir/?api=1&destination=${b.lat},${b.lng}`, '_blank')

  const formatDate = (d) => {
    if (!d) return '—'
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <div className="home-layout">
      <div className={`map-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-title"><span className="sidebar-count">{filtered.length}</span>Bhandaras</div>
          <div className="filter-row">
            <button className={`filter-chip ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
            <button className={`filter-chip ${filter === 'today' ? 'active' : ''}`} onClick={() => setFilter('today')}>
              🔥 Happening Today {todayCount > 0 && `(${todayCount})`}
            </button>
          </div>
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input className="map-search" placeholder="Search name or area..." value={search} onChange={e => setSearch(e.target.value)} />
            {search && <button className="search-clear" onClick={() => setSearch('')}>✕</button>}
          </div>
        </div>

        <div className="sidebar-list">
          {loading ? Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />) :
           filtered.length === 0 ? (
            <div className="sidebar-empty">
              <div style={{ fontSize: '2rem', marginBottom: 8 }}>🍛</div>
              <p>{filter === 'today' ? 'No bhandaras today' : 'No bhandaras found'}</p>
            </div>
          ) : filtered.map((b, i) => (
            <div key={b.id} className={`sidebar-card ${selected?.id === b.id ? 'active' : ''}`} onClick={() => handleSelectCard(b)} style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="sidebar-card-top">
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, flex: 1, minWidth: 0 }}>
                  <div className="sidebar-card-name">{b.name}</div>
                  {isToday(b.date) && <span className="today-badge"><span className="today-dot"></span>Today</span>}
                </div>
                <div className="sidebar-live-dot"></div>
              </div>
              <div className="sidebar-card-addr">📍 {b.address}</div>
              <div className="sidebar-card-meta">
                <span>📅 {formatDate(b.date)}</span>
                <span>⏰ {b.time || '—'}</span>
              </div>
              {editingId === b.id && (
                <div className="edit-form" onClick={e => e.stopPropagation()}>
                  <input className="edit-input" placeholder="Name" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} />
                  <input className="edit-input" placeholder="Description" value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} />
                  <div className="edit-row">
                    <input className="edit-input" type="date" value={editForm.date} onChange={e => setEditForm({...editForm, date: e.target.value})} />
                    <input className="edit-input" type="time" value={editForm.time} onChange={e => setEditForm({...editForm, time: e.target.value})} />
                  </div>
                  <input className="edit-input" placeholder="Address" value={editForm.address} onChange={e => setEditForm({...editForm, address: e.target.value})} />
                  <div className="edit-row">
                    <input className="edit-input" placeholder="Lat" value={editForm.lat} onChange={e => setEditForm({...editForm, lat: e.target.value})} />
                    <input className="edit-input" placeholder="Lng" value={editForm.lng} onChange={e => setEditForm({...editForm, lng: e.target.value})} />
                  </div>
                  <input className="edit-input" placeholder="Contact" value={editForm.contact} onChange={e => setEditForm({...editForm, contact: e.target.value})} />
                  <div className="edit-actions">
                    <button className="edit-save" onClick={e => handleEditSave(b.id, e)}>💾 Save</button>
                    <button className="edit-cancel" onClick={e => { e.stopPropagation(); setEditingId(null) }}>Cancel</button>
                  </div>
                </div>
              )}
              <div className="sidebar-card-actions">
                <button className="sidebar-directions" onClick={e => { e.stopPropagation(); openGoogleMaps(b) }}>🗺️ Directions</button>
                <button className="sidebar-share" onClick={e => handleShare(b, e)}>🔗 Share</button>
                {isAdmin && <>
                  <button className="sidebar-edit" onClick={e => editingId === b.id ? (e.stopPropagation(), setEditingId(null)) : startEdit(b, e)}>✏️</button>
                  <button className="sidebar-delete" onClick={e => handleDelete(b.id, e)}>🗑️</button>
                </>}
                <span className="sidebar-phone">📞 {b.contact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="map-area">
        <MapContainer center={[21.1458, 79.0882]} zoom={12} style={{ height: '100%', width: '100%' }} zoomControl={false}>
          <TileLayer attribution='&copy; <a href="https://carto.com/">CARTO</a>' url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          {selected?.lat && selected?.lng && <FlyToMarker position={[parseFloat(selected.lat), parseFloat(selected.lng)]} />}
          {filtered.filter(b => b.lat && b.lng).map(b => (
            <Marker key={b.id} position={[parseFloat(b.lat), parseFloat(b.lng)]} icon={createSaffronIcon(selected?.id === b.id)}
              ref={el => { if (el) markersRef.current[b.id] = el }} eventHandlers={{ click: () => setSelected(b) }}>
              <Popup className="custom-popup">
                <div className="popup-content">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                    <div className="popup-name" style={{ marginBottom: 0 }}>{b.name}</div>
                    {isToday(b.date) && <span className="today-badge"><span className="today-dot"></span>Today</span>}
                  </div>
                  <div className="popup-desc">{b.description}</div>
                  <div className="popup-meta"><span>📅 {formatDate(b.date)}</span><span>⏰ {b.time}</span></div>
                  <div className="popup-meta"><span>📍 {b.address}</span></div>
                  <div className="popup-meta"><span>📞 {b.contact}</span></div>
                  <button className="popup-directions" onClick={() => openGoogleMaps(b)}>🗺️ Open in Google Maps</button>
                  <button className="popup-share" onClick={() => handleShare(b)}>🔗 Share this Bhandara</button>
                  {isAdmin && <button className="popup-delete" onClick={() => handleDelete(b.id)}>🗑️ Delete Bhandara</button>}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        <div className="map-stats-overlay">
          <div className="map-stat-pill"><div className="map-stat-dot"></div>{bhandaras.length} bhandaras listed</div>
        </div>
      </div>

      <button className="mobile-sidebar-toggle" onClick={() => setSidebarOpen(prev => !prev)}>
        {sidebarOpen ? '✕ Close' : `🍛 Browse (${filtered.length})`}
      </button>
      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}

export default Home
