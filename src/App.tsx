import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
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

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [lang, setLang] = useState<Lang | null>(null)
  const [cursorState, setCursorState] = useState<'logo' | 'body' | 'done'>('logo')
  const [logoTyped, setLogoTyped] = useState(false)
  const [showLang, setShowLang] = useState(false)
  const [showBuiltBy, setShowBuiltBy] = useState(false)
  const [photosLocked, setPhotosLocked] = useState(false)

  useEffect(() => {
    setCursorState('logo')
    setShowLang(false)
    setShowBuiltBy(false)
  }, [location.pathname])

  // Lang fades in 5s after typing done (video is appearing), built-by 3s after lang
  useEffect(() => {
    if (cursorState !== 'done') return
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
          showCursor={cursorState !== 'body'}
          showLinks={done}
          onLogoTyped={() => setLogoTyped(true)}
          titleOverride={photosLocked ? ['Enter', 'Password.'] : undefined}
        />
        <main className="main">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<About logoTyped={logoTyped} onTypingStart={() => setCursorState('body')} onTypingDone={() => setCursorState('done')} />} />
            <Route path="/why" element={<Why logoTyped={logoTyped} onTypingStart={() => setCursorState('body')} onTypingDone={() => setCursorState('done')} />} />
            <Route path="/photos" element={<Photos onEnter={() => { setCursorState('body'); setPhotosLocked(true) }} onUnlock={() => { setCursorState('done'); setPhotosLocked(false) }} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className="footer">
          <div className="footer-lang" style={{ opacity: showLang ? 1 : 0, transition: FADE }}>
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
