import { useState } from 'react'
import '../styles/AddBhandara.css'

function AddBhandara() {
  const [form, setForm] = useState({
    name: '', description: '', date: '',
    time: '', address: '', contact: '',
    lat: '', lng: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:5000/api/bhandaras', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      console.log('Added:', data)
      alert('✅ Bhandara added successfully!')
      setForm({ name: '', description: '', date: '', time: '', address: '', contact: '', lat: '', lng: '' })
    } catch (err) {
      console.error('Error:', err)
      alert('❌ Failed to add bhandara')
    }
  }

  return (
    <div className="add-page">
      <h2>➕ Add a Bhandara</h2>
      <div className="add-form">
        <input name="name" placeholder="Bhandara Name" value={form.name} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="date" type="date" value={form.date} onChange={handleChange} />
        <input name="time" type="time" value={form.time} onChange={handleChange} />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
        <input name="contact" placeholder="Contact Number" value={form.contact} onChange={handleChange} />
        <input name="lat" placeholder="Latitude (e.g. 21.1458)" value={form.lat} onChange={handleChange} />
        <input name="lng" placeholder="Longitude (e.g. 79.0882)" value={form.lng} onChange={handleChange} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default AddBhandara