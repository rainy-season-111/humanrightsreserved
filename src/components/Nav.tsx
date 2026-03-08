import { NavLink } from 'react-router-dom'
import { useLang } from '../LangContext'
import { t } from '../i18n'
import './Nav.css'

export default function Nav() {
  const lang = useLang()
  const nav = t[lang].nav

  return (
    <nav className="nav">
      <span className="nav-title">humanrightsreserved.org</span>
      <div className="nav-links">
        <NavLink
          to="/about"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          {nav.about}
        </NavLink>
        <NavLink
          to="/why"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          {nav.why}
        </NavLink>
        <NavLink
          to="/photos"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          {nav.photos}
        </NavLink>
      </div>
    </nav>
  )
}
