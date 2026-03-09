import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../LangContext'
import { t } from '../i18n'
import Typewriter from '../components/Typewriter'
import './Photos.css'

const ease = [0.16, 1, 0.3, 1] as const

// Add photo filenames here in order, e.g. ['photo-1.jpg', 'photo-2.jpg']
const photos: string[] = []

export default function Photos({ logoTyped, onTypingStart, onTypingDone, onLockCursor }: { logoTyped?: boolean; onTypingStart?: () => void; onTypingDone?: () => void; onLockCursor?: (visible: boolean) => void }) {
  const lang = useLang()
  const [input, setInput] = useState('')
  const [unlocked, setUnlocked] = useState(() => !!sessionStorage.getItem('hrr_photos_token'))
  const [shake, setShake] = useState(false)
  const [showCursor, setShowCursor] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!logoTyped) return
    const timer = setTimeout(() => {
      setShowCursor(true)
      onLockCursor?.(true)
      inputRef.current?.focus()
    }, 2500)
    return () => clearTimeout(timer)
  }, [logoTyped])

  const handleSubmit = useCallback(async () => {
    if (submitting || !input) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: input }),
      })
      if (res.ok) {
        const { token } = await res.json()
        sessionStorage.setItem('hrr_photos_token', token)
        setUnlocked(true)
        onLockCursor?.(false)
      } else {
        setShake(true)
        setTimeout(() => {
          setShake(false)
          setInput('')
        }, 500)
      }
    } catch {
      setShake(true)
      setTimeout(() => {
        setShake(false)
        setInput('')
      }, 500)
    } finally {
      setSubmitting(false)
    }
  }, [input, submitting])

  // Keep input focused when user clicks anywhere
  useEffect(() => {
    if (unlocked) return
    const refocus = () => inputRef.current?.focus()
    window.addEventListener('click', refocus)
    return () => window.removeEventListener('click', refocus)
  }, [unlocked])

  return (
    <div className={`photos ${unlocked ? 'photos--gallery' : ''}`}>
      <AnimatePresence mode="wait">
        {!unlocked ? (
          <motion.div
            key="lock"
            className="lock-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease }}
            onClick={() => inputRef.current?.focus()}
          >
            <input
              ref={inputRef}
              className="lock-hidden-input"
              type="text"
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              value={input}
              onChange={e => { if (!unlocked) setInput(e.target.value) }}
              onKeyDown={e => { if (e.key === 'Enter') handleSubmit() }}
            />
            <div className="lock-prompt-wrap">
              <span className={`lock-prompt ${showCursor ? 'lock-prompt--visible' : ''}`}>{t[lang].enterPassword}</span>
              <div className={`lock-input ${shake ? 'shake' : ''}`}>
                {input.split('').map((_, i) => (
                  <span key={i} className="lock-star">&#10038;</span>
                ))}
                {showCursor && <span className="lock-cursor" />}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="gallery"
            className="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5, ease }}
          >
            <div className="gallery-hero">
              <Typewriter
                paragraphs={['the story so far...']}
                startDelay={2.5}
                lineClassName="gallery-hero-line"
                onStart={onTypingStart}
                onComplete={onTypingDone}
              />
            </div>
            <div className="gallery-grid">
              {photos.map((src, i) => (
                <motion.img
                  key={src}
                  className="gallery-img"
                  src={`/photos/${src}`}
                  alt=""
                  loading="lazy"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.4, delay: 1.2 + i * 0.15, ease }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
