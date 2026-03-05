import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../styles/Navbar.css'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const email = localStorage.getItem('email')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropRef = useRef(null)

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    setDropdownOpen(false)
    navigate('/')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <div className="brand-dot"></div>
        Bhandara Locator
      </Link>

      <div className="navbar-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Map</Link>
        <Link to="/list" className={location.pathname === '/list' ? 'active' : ''}>Browse</Link>
        <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>

        {token ? (
          <div className="admin-dropdown" ref={dropRef}>
            <button
              className="admin-trigger"
              onClick={() => setDropdownOpen(prev => !prev)}
            >
              <div className="admin-avatar-small">
                {email ? email.charAt(0).toUpperCase() : 'A'}
              </div>
              <span className="admin-email-short">
                {email ? email.split('@')[0] : 'Admin'}
              </span>
              <span className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`}>▾</span>
            </button>

            {dropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-header">{email}</div>
                <div className="dropdown-divider"></div>
                <Link
                  to="/add"
                  className="dropdown-item"
                  onClick={() => setDropdownOpen(false)}
                >
                  🍛 Add Bhandara
                </Link>
                <Link
                  to="/admin/users"
                  className="dropdown-item"
                  onClick={() => setDropdownOpen(false)}
                >
                  👥 Manage Admins
                </Link>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item logout" onClick={handleLogout}>
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="nav-cta">Login</Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar