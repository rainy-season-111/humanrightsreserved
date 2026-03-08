import { useState } from 'react'
import { useLang } from '../LangContext'
import { t } from '../i18n'
import Typewriter from '../components/Typewriter'
import './About.css'

export default function About({ logoTyped, revisit, onTypingStart, onTypingDone }: { logoTyped?: boolean; revisit?: boolean; onTypingStart?: () => void; onTypingDone?: () => void }) {
  const lang = useLang()
  const paragraphs = t[lang].about
  const [showVideo, setShowVideo] = useState(!!revisit)
  const lastLineIndex = paragraphs.length - 1

  const handleLineComplete = (lineIndex: number) => {
    if (lineIndex === lastLineIndex) {
      setShowVideo(true)
    }
  }

  return (
    <div className="about" key={lang}>
      <div className="about-text">
        <Typewriter
          paragraphs={paragraphs}
          startDelay={logoTyped ? 2.5 : 999}
          fast={revisit}
          onStart={onTypingStart}
          onComplete={onTypingDone}
          onLineComplete={handleLineComplete}
        />
      </div>

      <div
        className={`about-video ${showVideo ? 'about-video--visible' : ''}`}
        style={revisit ? { transition: 'none' } : undefined}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/about-video.mp4"
        />
      </div>
    </div>
  )
}
