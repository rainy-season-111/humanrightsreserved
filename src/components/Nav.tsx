import { useState, useEffect, useRef } from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import { useLang } from '../LangContext'
import { t } from '../i18n'
import './Nav.css'

const LOGO_LINES = ['human', 'rights', 'reserved.']
const LOGO_CHAR_DELAY = 80
const LOGO_LINE_PAUSE = 1200

function useLogoTypewriter(startDelay: number, onComplete?: () => void) {
  const [lineIndex, setLineIndex] = useState(-1)
  const [charIndex, setCharIndex] = useState(0)
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    const id = setTimeout(() => {
      setStarted(true)
      setLineIndex(0)
      setCharIndex(0)
    }, startDelay * 1000)
    return () => clearTimeout(id)
  }, [startDelay])

  useEffect(() => {
    if (!started || lineIndex < 0 || lineIndex >= LOGO_LINES.length) return
    const line = LOGO_LINES[lineIndex]
    if (charIndex < line.length) {
      timerRef.current = setTimeout(() => setCharIndex(prev => prev + 1), LOGO_CHAR_DELAY)
    } else if (lineIndex < LOGO_LINES.length - 1) {
      timerRef.current = setTimeout(() => {
        setLineIndex(prev => prev + 1)
        setCharIndex(0)
      }, LOGO_LINE_PAUSE)
    } else if (!done) {
      setDone(true)
      onComplete?.()
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [started, lineIndex, charIndex, done, onComplete])

  return { started, lineIndex, charIndex, done }
}

export default function Nav({ showCursor, showLinks, onLogoTyped, titleOverride }: { showCursor?: boolean; showLinks?: boolean; onLogoTyped?: () => void; titleOverride?: string[] }) {
  const lang = useLang()
  const nav = t[lang].nav
  const location = useLocation()
  const homeActive = location.pathname === '/'
  const logo = useLogoTypewriter(3, onLogoTyped)
  const displayLines = titleOverride || LOGO_LINES

  return (
    <nav className="nav">
      <div className="nav-title">
        {displayLines.map((text, i) => {
          if (titleOverride) {
            return (
              <span key={i} className="nav-title-line">
                <span className="nav-title-placeholder">{text}</span>
                <span className="nav-title-visible">{text}</span>
              </span>
            )
          }
          const isTyping = logo.started && i === logo.lineIndex
          const isDone = logo.started && i < logo.lineIndex
          const visible = logo.done || isDone ? text : isTyping ? text.slice(0, logo.charIndex) : ''
          const cursorHere = isTyping && !logo.done
          const returnCursor = logo.done && i === LOGO_LINES.length - 1 && showCursor

          return (
            <span key={i} className="nav-title-line">
              <span className="nav-title-placeholder">{text}</span>
              <span className="nav-title-visible">
                {visible}
                {(cursorHere || returnCursor) && <span className="typewriter-cursor" />}
              </span>
            </span>
          )
        })}
      </div>
      <div className="nav-links" style={{ opacity: showLinks ? 1 : 0, transition: 'opacity 2s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <NavLink
          to="/"
          className={`nav-link ${homeActive ? 'active' : ''}`}
        >
          {nav.home}
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
        <a
          href="https://humanrightsreserved.com"
          className="nav-link"
        >
          .com
        </a>
      </div>
    </nav>
  )
}
