import { NavLink } from 'react-router-dom'
import './Nav.css'

export default function Nav() {
  return (
    <nav className="nav">
      <span className="nav-title">humanrightsreserved.org</span>
      <div className="nav-links">
        <NavLink
          to="/about"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          about.
        </NavLink>
        <NavLink
          to="/why"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          why?
        </NavLink>
      </div>
    </nav>
  )
}
