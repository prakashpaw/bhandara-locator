import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../styles/Navbar.css'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const email = localStorage.getItem('email')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
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
          <>
            <Link to="/add" className={`nav-cta ${location.pathname === '/add' ? 'active' : ''}`}>+ Add Bhandara</Link>
            <button className="logout-btn" onClick={handleLogout}>Logout ({email})</button>
          </>
        ) : (
          <Link to="/login" className="nav-cta">Login</Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar