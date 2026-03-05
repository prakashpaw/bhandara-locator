import { Link, useLocation } from 'react-router-dom'
import '../styles/Navbar.css'

function Navbar() {
  const location = useLocation()

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
        <Link to="/add" className={`nav-cta ${location.pathname === '/add' ? 'active' : ''}`}>+ Add Bhandara</Link>
      </div>
    </nav>
  )
}

export default Navbar
