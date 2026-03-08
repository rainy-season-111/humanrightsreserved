import { useLocation, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLang } from '../LangContext'
import { t } from '../i18n'
import './Nav.css'

const ease = [0.16, 1, 0.3, 1] as const

export default function Nav() {
  const lang = useLang()
  const nav = t[lang].nav
  const location = useLocation()
  const aboutActive = location.pathname === '/about'

  return (
    <nav className="nav">
      <motion.span
        className="nav-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, delay: 0, ease }}
      >
        humanrightsreserved.org
      </motion.span>
      <div className="nav-links">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2.5, ease }}
        >
          <NavLink
            to="/about"
            className={`nav-link nav-link-about ${aboutActive ? '' : 'inactive'}`}
          >
            {nav.about}
          </NavLink>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 4, ease }}
        >
          <NavLink
            to="/why"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            {nav.why}
          </NavLink>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 5.5, ease }}
        >
          <NavLink
            to="/photos"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            {nav.photos}
          </NavLink>
        </motion.div>
      </div>
    </nav>
  )
}
