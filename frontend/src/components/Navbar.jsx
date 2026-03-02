import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">🍛 Bhandara Locator</div>
      <div className="navbar-links">
        <Link to="/">Map</Link>
        <Link to="/list">List</Link>
        <Link to="/add">Add Bhandara</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  )
}

export default Navbar