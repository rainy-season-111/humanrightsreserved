import { useState, useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import Nav from './components/Nav'
import About from './pages/About'
import Why from './pages/Why'
import Photos from './pages/Photos'
import NotFound from './pages/NotFound'
import MusicPlayer from './components/MusicPlayer'
import { languages, t, type Lang } from './i18n'
import { LangContext } from './LangContext'
import './App.css'

const ease = [0.16, 1, 0.3, 1] as const
const FADE = 'opacity 2s cubic-bezier(0.16, 1, 0.3, 1)'

// Page transition: 300ms out, 100ms pause, 400ms in = ~800ms total
const EXIT_EASE = [0.4, 0, 1, 1] as const
const ENTER_EASE = [0, 0, 0.2, 1] as const

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [lang, setLang] = useState<Lang | null>(() => {
    try {
      const stored = localStorage.getItem('hrr_lang')
      return stored && languages.includes(stored as Lang) ? stored as Lang : null
    } catch { return null }
  })
  const [cursorState, setCursorState] = useState<'logo' | 'body' | 'done'>('logo')
  const [logoTyped, setLogoTyped] = useState(false)
  const [showLang, setShowLang] = useState(false)
  const [showBuiltBy, setShowBuiltBy] = useState(false)
  const [photosLocked, setPhotosLocked] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const [navRevealed, setNavRevealed] = useState(false)
  const visitedRef = useRef<Set<string>>(null!)
  if (visitedRef.current === null) {
    try {
      const stored = localStorage.getItem('hrr_visited')
      visitedRef.current = stored ? new Set(JSON.parse(stored)) : new Set()
    } catch { visitedRef.current = new Set() }
  }

  const isRevisit = visitedRef.current.has(location.pathname)

  useEffect(() => {
    // Lock nav during page transition (shorter on revisit)
    setTransitioning(true)
    const transTimer = setTimeout(() => setTransitioning(false), isRevisit ? 450 : 800)
    let lockTimer: ReturnType<typeof setTimeout> | undefined

    if (location.pathname === '/photos') {
      // Delay title change until exit animation finishes
      lockTimer = setTimeout(() => setPhotosLocked(true), isRevisit ? 200 : 300)
    } else {
      // Clear immediately when leaving photos so title reverts before old page exits
      setPhotosLocked(false)
      if (isRevisit) {
        // Return visit: skip animations, show everything immediately
        setCursorState('done')
        setShowLang(true)
        setShowBuiltBy(true)
      } else {
        // First visit: full animation sequence
        setCursorState('logo')
        setShowLang(false)
        setShowBuiltBy(false)
      }
    }

    // Mark page as visited when leaving
    return () => {
      visitedRef.current.add(location.pathname)
      try { localStorage.setItem('hrr_visited', JSON.stringify([...visitedRef.current])) } catch {}
      clearTimeout(transTimer)
      if (lockTimer) clearTimeout(lockTimer)
    }
  }, [location.pathname])

  // Once nav links appear, they stay visible permanently
  useEffect(() => {
    if (cursorState === 'done') {
      setNavRevealed(true)
      visitedRef.current.add(location.pathname)
    }
  }, [cursorState])

  // Persist visited state when tab closes
  useEffect(() => {
    const save = () => {
      try { localStorage.setItem('hrr_visited', JSON.stringify([...visitedRef.current])) } catch {}
    }
    window.addEventListener('beforeunload', save)
    return () => window.removeEventListener('beforeunload', save)
  }, [])

  // First visit: lang fades in 5s after typing done, built-by 8s after
  useEffect(() => {
    if (cursorState !== 'done' || isRevisit) return
    const langTimer = setTimeout(() => setShowLang(true), 5000)
    const builtByTimer = setTimeout(() => setShowBuiltBy(true), 8000)
    return () => { clearTimeout(langTimer); clearTimeout(builtByTimer) }
  }, [cursorState])

  const selectLang = (l: Lang) => {
    setLang(l)
    try { localStorage.setItem('hrr_lang', l) } catch {}
    navigate('/')
  }

  const knownPaths = ['/', '/why', '/photos']
  if (!lang && !knownPaths.includes(location.pathname)) {
    return <NotFound />
  }

  if (!lang) {
    return (
      <div className="lang-gate">
        <motion.div
          className="lang-gate-options"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5, ease }}
        >
          {languages.map((l, i) => (
            <motion.span
              key={l}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 1 + i * 0.5, ease }}
            >
              <button
                className="lang-gate-btn"
                onClick={() => selectLang(l)}
              >
                {l === 'GEORDIE' ? 'GEORDIE [7/7]' : l}
              </button>
              {i < languages.length - 1 && <span className="lang-gate-sep">|</span>}
            </motion.span>
          ))}
        </motion.div>
        <motion.span
          className="lang-gate-footer built-by"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 2.5, delay: 3, ease }}
        >
          built by tamara and william.
        </motion.span>
      </div>
    )
  }

  return (
    <LangContext.Provider value={lang}>
      <div className="app">
        <Nav
          showCursor={!photosLocked && cursorState !== 'body'}
          showLinks={navRevealed}
          skipLogo={navRevealed}
          onLogoTyped={() => setLogoTyped(true)}
          photosLocked={photosLocked}
          transitioning={transitioning}
          onPhotosClose={() => navigate('/')}
        />
        <main className="main">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: isRevisit ? 6 : 12 }}
              animate={{ opacity: 1, y: 0, transition: { duration: isRevisit ? 0.25 : 0.4, ease: ENTER_EASE, delay: isRevisit ? 0.05 : 0.1 } }}
              exit={{ opacity: 0, y: -12, transition: { duration: isRevisit ? 0.2 : 0.3, ease: EXIT_EASE } }}
              style={{ height: '100%' }}
            >
              <Routes location={location}>
                <Route path="/" element={<About logoTyped={logoTyped} revisit={isRevisit || navRevealed} onTypingStart={isRevisit || navRevealed ? undefined : () => setCursorState('body')} onTypingDone={isRevisit || navRevealed ? undefined : () => setCursorState('done')} />} />
                <Route path="/why" element={<Why logoTyped={logoTyped} revisit={isRevisit || navRevealed} onTypingStart={isRevisit || navRevealed ? undefined : () => setCursorState('body')} onTypingDone={isRevisit || navRevealed ? undefined : () => setCursorState('done')} />} />
                <Route path="/photos" element={<Photos onUnlock={() => setPhotosLocked(false)} onTypingStart={() => setCursorState('body')} onTypingDone={() => setCursorState('done')} />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
        <footer className="footer">
          <div className="footer-lang" style={{ opacity: showLang ? 1 : 0, pointerEvents: showLang ? 'auto' : 'none', transition: FADE }}>
            {languages.map((l, i) => (
              <span key={l}>
                <button
                  className={`lang-btn shimmer ${lang === l ? 'active' : ''}`}
                  onClick={() => { setLang(l); try { localStorage.setItem('hrr_lang', l) } catch {} }}
                >
                  {l === 'GEORDIE' ? 'GEORDIE [7/7]' : l}
                </button>
                {i < languages.length - 1 && <span className="lang-sep shimmer">|</span>}
              </span>
            ))}
          </div>
          <MusicPlayer />
        </footer>
        <div className="built-by-row" style={{ opacity: showBuiltBy ? 1 : 0, transition: FADE }}>
          <span className="built-by">{t[lang].builtBy}</span>
        </div>
      </div>
    </LangContext.Provider>
  )
}

export default App
