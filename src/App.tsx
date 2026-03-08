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
  const [lang, setLang] = useState<Lang | null>(null)
  const [cursorState, setCursorState] = useState<'logo' | 'body' | 'done'>('logo')
  const [logoTyped, setLogoTyped] = useState(false)
  const [showLang, setShowLang] = useState(false)
  const [showBuiltBy, setShowBuiltBy] = useState(false)
  const [photosLocked, setPhotosLocked] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const visitedRef = useRef<Set<string>>(new Set())

  const isRevisit = visitedRef.current.has(location.pathname)

  useEffect(() => {
    // Lock nav during page transition
    setTransitioning(true)
    const transTimer = setTimeout(() => setTransitioning(false), 800)
    let lockTimer: ReturnType<typeof setTimeout> | undefined

    if (location.pathname === '/photos') {
      // Delay title change until exit animation finishes (400ms = 300ms exit + 100ms pause)
      lockTimer = setTimeout(() => setPhotosLocked(true), 400)
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
      clearTimeout(transTimer)
      if (lockTimer) clearTimeout(lockTimer)
    }
  }, [location.pathname])

  // First visit: lang fades in 5s after typing done, built-by 8s after
  useEffect(() => {
    if (cursorState !== 'done' || isRevisit) return
    const langTimer = setTimeout(() => setShowLang(true), 5000)
    const builtByTimer = setTimeout(() => setShowBuiltBy(true), 8000)
    return () => { clearTimeout(langTimer); clearTimeout(builtByTimer) }
  }, [cursorState])

  const selectLang = (l: Lang) => {
    setLang(l)
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

  const done = cursorState === 'done'

  return (
    <LangContext.Provider value={lang}>
      <div className="app">
        <Nav
          showCursor={!photosLocked && cursorState !== 'body'}
          showLinks={done}
          onLogoTyped={() => setLogoTyped(true)}
          photosLocked={photosLocked}
          transitioning={transitioning}
        />
        <main className="main">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: ENTER_EASE, delay: 0.1 } }}
              exit={{ opacity: 0, y: -12, transition: { duration: 0.3, ease: EXIT_EASE } }}
              style={{ height: '100%' }}
            >
              <Routes location={location}>
                <Route path="/" element={<About logoTyped={logoTyped} revisit={isRevisit} onTypingStart={() => setCursorState('body')} onTypingDone={() => setCursorState('done')} />} />
                <Route path="/why" element={<Why logoTyped={logoTyped} revisit={isRevisit} onTypingStart={() => setCursorState('body')} onTypingDone={() => setCursorState('done')} />} />
                <Route path="/photos" element={<Photos onUnlock={() => setPhotosLocked(false)} />} />
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
                  onClick={() => setLang(l)}
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
