import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../styles/Navbar.css'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const email = localStorage.getItem('email')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const dropRef = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropdownOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    setDropdownOpen(false)
    setMenuOpen(false)
    navigate('/')
  }

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          <div className="brand-dot"></div>
          Bhandara Locator
        </Link>

        {/* DESKTOP LINKS */}
        <div className="navbar-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Map</Link>
          <Link to="/list" className={location.pathname === '/list' ? 'active' : ''}>Browse</Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>

          {token ? (
            <div className="admin-dropdown" ref={dropRef}>
              <button className="admin-trigger" onClick={() => setDropdownOpen(p => !p)}>
                <div className="admin-avatar-small">{email ? email.charAt(0).toUpperCase() : 'A'}</div>
                <span className="admin-email-short">{email ? email.split('@')[0] : 'Admin'}</span>
                <span className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`}>▾</span>
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">{email}</div>
                  <div className="dropdown-divider"></div>
                  <Link to="/add" className="dropdown-item" onClick={() => setDropdownOpen(false)}>🍛 Add Bhandara</Link>
                  {localStorage.getItem('role') === 'admin' && (
                    <Link to="/admin/users" className="dropdown-item" onClick={() => setDropdownOpen(false)}>👥 Manage Admins</Link>
                  )}
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item logout" onClick={handleLogout}>🚪 Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="nav-cta">Login</Link>
          )}
        </div>

        {/* HAMBURGER */}
        <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(p => !p)}>
          <span></span><span></span><span></span>
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>🗺️ Map</Link>
        <Link to="/list" className={location.pathname === '/list' ? 'active' : ''}>📋 Browse</Link>
        <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>ℹ️ About</Link>

        {token ? (
          <>
            <div className="mobile-divider"></div>
            <div style={{ padding: '8px 16px', fontSize: '0.75rem', color: 'var(--muted)' }}>{email}</div>
            <Link to="/add" className="">🍛 Add Bhandara</Link>
            {localStorage.getItem('role') === 'admin' && (
              <Link to="/admin/users" className="">👥 Manage Admins</Link>
            )}
            <div className="mobile-divider"></div>
            <button className="mobile-logout" onClick={handleLogout}>🚪 Logout</button>
          </>
        ) : (
          <>
            <div className="mobile-divider"></div>
            <Link to="/login" className="mobile-cta">🔐 Admin Login</Link>
          </>
        )}
      </div>
    </>
  )
}

export default Navbar
