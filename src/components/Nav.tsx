import { useEffect, useRef, useState } from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import { useLang } from '../LangContext'
import { t } from '../i18n'
import './Nav.css'

const LOGO_CHAR_DELAY = 80
const LOGO_LINE_PAUSE = 1200

function useLogoTypewriter(lines: string[], startDelay: number, skip?: boolean, onComplete?: () => void) {
  const [lineIndex, setLineIndex] = useState(skip ? lines.length - 1 : -1)
  const [charIndex, setCharIndex] = useState(0)
  const [started, setStarted] = useState(!!skip)
  const [done, setDone] = useState(!!skip)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

  // Skip can become true mid-animation or on initial mount
  useEffect(() => {
    if (skip) {
      if (timerRef.current) clearTimeout(timerRef.current)
      setStarted(true)
      setLineIndex(lines.length - 1)
      setCharIndex(lines[lines.length - 1].length)
      setDone(true)
      onComplete?.()
    }
  }, [skip])

  useEffect(() => {
    if (skip) return
    const id = setTimeout(() => {
      setStarted(true)
      setLineIndex(0)
      setCharIndex(0)
    }, startDelay * 1000)
    return () => clearTimeout(id)
  }, [skip, startDelay])

  useEffect(() => {
    if (skip || !started || lineIndex < 0 || lineIndex >= lines.length) return
    const line = lines[lineIndex]
    if (charIndex < line.length) {
      timerRef.current = setTimeout(() => setCharIndex(prev => prev + 1), LOGO_CHAR_DELAY)
    } else if (lineIndex < lines.length - 1) {
      timerRef.current = setTimeout(() => {
        setLineIndex(prev => prev + 1)
        setCharIndex(0)
      }, LOGO_LINE_PAUSE)
    } else if (!done) {
      setDone(true)
      onComplete?.()
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [skip, started, lineIndex, charIndex, done, onComplete, lines])

  return { started, lineIndex, charIndex, done }
}

export default function Nav({ showCursor, showLinks, skipLogo, onLogoTyped, transitioning }: {
  showCursor?: boolean
  showLinks?: boolean
  skipLogo?: boolean
  onLogoTyped?: () => void
  transitioning?: boolean
}) {
  const lang = useLang()
  const nav = t[lang].nav
  const logoLines = t[lang].logo
  const location = useLocation()
  const homeActive = location.pathname === '/'
  const logo = useLogoTypewriter(logoLines, 3, skipLogo, onLogoTyped)

  // Disable nav clicks during page transitions or when links aren't shown
  const linksClickable = showLinks && !transitioning

  return (
    <nav className="nav">
      <div className="nav-title">
        {logoLines.map((text, i) => {
          const isTyping = logo.started && i === logo.lineIndex
          const isDone = logo.started && i < logo.lineIndex
          const visible = logo.done || isDone ? text : isTyping ? text.slice(0, logo.charIndex) : ''
          const cursorHere = isTyping && !logo.done
          const returnCursor = logo.done && i === logoLines.length - 1 && showCursor

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
      <div className="nav-links" style={{
        opacity: showLinks ? 1 : 0,
        pointerEvents: linksClickable ? 'auto' : 'none',
        transition: 'opacity 2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
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
