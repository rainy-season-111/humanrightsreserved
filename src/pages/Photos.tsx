import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Photos.css'

const ease = [0.16, 1, 0.3, 1] as const
const PASSWORD = 'puravida'

// Add photo filenames here in order, e.g. ['photo-1.jpg', 'photo-2.jpg']
const photos: string[] = []

export default function Photos({ onUnlock }: { onUnlock?: () => void }) {
  const [input, setInput] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [shake, setShake] = useState(false)
  const [showCursor, setShowCursor] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCursor(true)
      inputRef.current?.focus()
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = useCallback(() => {
    if (input === PASSWORD) {
      setUnlocked(true)
      onUnlock?.()
    } else {
      setShake(true)
      setTimeout(() => {
        setShake(false)
        setInput('')
      }, 500)
    }
  }, [input])

  // Desktop: global keydown
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (unlocked) return
    if (e.key === 'Enter') {
      handleSubmit()
    } else if (e.key === 'Backspace') {
      setInput(prev => prev.slice(0, -1))
    } else if (e.key.length === 1 && !e.metaKey && !e.ctrlKey) {
      setInput(prev => prev + e.key)
    }
  }, [input, unlocked, handleSubmit])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

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
            <div className={`lock-input ${shake ? 'shake' : ''}`}>
              {input.split('').map((_, i) => (
                <span key={i} className="lock-star">&#10038;</span>
              ))}
              {showCursor && <span className="lock-cursor" />}
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
            <h1 className="gallery-hero">the story so far...</h1>
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
