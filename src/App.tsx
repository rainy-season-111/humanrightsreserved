import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import Nav from './components/Nav'
import About from './pages/About'
import Why from './pages/Why'
import Photos from './pages/Photos'
import MusicPlayer from './components/MusicPlayer'
import { languages, t, type Lang } from './i18n'
import { LangContext } from './LangContext'
import './App.css'

const ease = [0.16, 1, 0.3, 1] as const

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [lang, setLang] = useState<Lang | null>(null)

  const selectLang = (l: Lang) => {
    setLang(l)
    navigate('/about')
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
      <motion.div
        className="app"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 4, delay: 1, ease }}
      >
        <Nav />
        <main className="main">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/about" element={<About />} />
              <Route path="/why" element={<Why />} />
              <Route path="/photos" element={<Photos />} />
              <Route path="*" element={<Navigate to="/about" replace />} />
            </Routes>
          </AnimatePresence>
        </main>
        <footer className="footer">
          <motion.div
            className="footer-lang"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 18, ease }}
          >
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
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 16, ease }}
          >
            <MusicPlayer />
          </motion.div>
        </footer>
        <motion.div
          className="built-by-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 20, ease }}
        >
          <span className="built-by">{t[lang].builtBy}</span>
        </motion.div>
      </motion.div>
    </LangContext.Provider>
  )
}

export default App
