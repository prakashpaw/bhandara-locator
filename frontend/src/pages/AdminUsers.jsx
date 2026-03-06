import API from '../api'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/AdminUsers.css'

function AdminUsers() {
  const [admins, setAdmins] = useState([])
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const fetchAdmins = () => {
    fetch(API + '/api/auth/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setAdmins(Array.isArray(data) ? data : []))
      .catch(err => console.error(err))
  }

  useEffect(() => { fetchAdmins() }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      setError('Email and password are required')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch(API + '/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to create user')
        return
      }
      setSuccess(true)
      setForm({ email: '', password: '' })
      fetchAdmins()
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  })

  return (
    <div className="admin-page">
      <h1 className="page-heading">Manage Admins</h1>
      <p className="page-sub">Create and view admin users who can add bhandaras</p>

      <div className="admin-grid">

        {/* CREATE NEW ADMIN */}
        <div className="admin-card">
          <div className="admin-card-title">👤 Create New Admin</div>

          {success && <div className="success-msg">✅ Admin created successfully!</div>}
          {error && <div className="error-msg">❌ {error}</div>}

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              name="email"
              type="email"
              placeholder="admin@email.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group" style={{ marginTop: 14 }}>
            <label className="form-label">Password</label>
            <input
              className="form-input"
              name="password"
              type="password"
              placeholder="Strong password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <button
            className="submit-btn"
            style={{ marginTop: 16 }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? '⏳ Creating...' : '➕ Create Admin'}
          </button>
        </div>

        {/* EXISTING ADMINS */}
        <div className="admin-card">
          <div className="admin-card-title">👥 Existing Admins ({admins.length})</div>
          <div className="admins-list">
            {admins.length === 0 ? (
              <div className="empty-state"><p>No admins found</p></div>
            ) : (
              admins.map((a, i) => (
                <div className="admin-row" key={a.id} style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className="admin-row-left">
                    <div className="admin-avatar">
                      {a.email.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="admin-email">{a.email}</div>
                      <div className="admin-meta">Joined {formatDate(a.created_at)}</div>
                    </div>
                  </div>
                  <div className="admin-role-badge">{a.role}</div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default AdminUsers