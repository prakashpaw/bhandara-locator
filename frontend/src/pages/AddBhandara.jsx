import { useState } from 'react'
import '../styles/AddBhandara.css'

function AddBhandara() {
  const [form, setForm] = useState({
    name: '', description: '', date: '',
    time: '', address: '', contact: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submitted:', form)
    alert('Bhandara added! (Backend coming soon)')
  }

  return (
    <div className="add-page">
      <h2>➕ Add a Bhandara</h2>
      <div className="add-form">
        <input name="name" placeholder="Bhandara Name" onChange={handleChange} />
        <textarea name="description" placeholder="Description" onChange={handleChange} />
        <input name="date" type="date" onChange={handleChange} />
        <input name="time" type="time" onChange={handleChange} />
        <input name="address" placeholder="Address" onChange={handleChange} />
        <input name="contact" placeholder="Contact Number" onChange={handleChange} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default AddBhandara