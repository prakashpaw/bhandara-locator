import { useState } from 'react'
import '../styles/AddBhandara.css'

function AddBhandara() {
  const [form, setForm] = useState({
    name: '', description: '', date: '',
    time: '', address: '', contact: '',
    lat: '', lng: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Get token for authentication
    const token = localStorage.getItem('token')
    
    try {
      const res = await fetch('http://3.6.90.129/api/bhandaras', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Added Authorization header
        },
        body: JSON.stringify(form)
      })

      if (!res.ok) {
        // Handle unauthorized or other errors
        if (res.status === 401) {
          alert('❌ Session expired or unauthorized. Please log in again.')
        } else {
          throw new Error('Failed to submit')
        }
        return
      }

      const data = await res.json()
      console.log('Added:', data)
      setSuccess(true)
      
      // Reset form
      setForm({ name: '', description: '', date: '', time: '', address: '', contact: '', lat: '', lng: '' })
      setTimeout(() => setSuccess(false), 4000)
    } catch (err) {
      console.error('Error:', err)
      alert('❌ Failed to add bhandara. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="add-page">
      <h1 className="page-heading">Add a Bhandara</h1>
      <p className="page-sub">Help your community find free meals near them</p>

      <div className="form-grid">
        {success && (
          <div className="success-msg">✅ Bhandara added successfully! It will appear on the map shortly.</div>
        )}

        <div className="form-group full">
          <label className="form-label">Bhandara Name</label>
          <input className="form-input" name="name" placeholder="e.g. Sai Baba Bhandara" value={form.name} onChange={handleChange} />
        </div>

        <div className="form-group full">
          <label className="form-label">Description</label>
          <textarea className="form-textarea" name="description" placeholder="Tell people what to expect..." value={form.description} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label className="form-label">Date</label>
          <input className="form-input" name="date" type="date" value={form.date} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label className="form-label">Time</label>
          <input className="form-input" name="time" type="time" value={form.time} onChange={handleChange} />
        </div>

        <div className="form-group full">
          <label className="form-label">Address</label>
          <input className="form-input" name="address" placeholder="Full address" value={form.address} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label className="form-label">Latitude</label>
          <input className="form-input" name="lat" placeholder="e.g. 21.1458" value={form.lat} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label className="form-label">Longitude</label>
          <input className="form-input" name="lng" placeholder="e.g. 79.0882" value={form.lng} onChange={handleChange} />
        </div>

        <div className="form-group full">
          <label className="form-label">Contact Number</label>
          <input className="form-input" name="contact" placeholder="Phone number" value={form.contact} onChange={handleChange} />
        </div>

        <div className="form-group full">
          <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? '⏳ Submitting...' : '🍛 Submit Bhandara'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddBhandara