import { motion, type Transition } from 'framer-motion'
import { useLang } from '../LangContext'
import { t } from '../i18n'
import './About.css'

const ease = [0.16, 1, 0.3, 1] as const

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 2, ease } satisfies Transition,
}

// ~180 wpm = 3 words/sec, + small pause between lines
function readingTime(text: string) {
  const words = text.split(/\s+/).length
  return words / 3 + 0.8
}

function getDelays(paragraphs: string[], startAt: number) {
  const delays: number[] = []
  let t = startAt
  for (let i = 0; i < paragraphs.length; i++) {
    delays.push(t)
    t += readingTime(paragraphs[i]) + 2 // reading time + fade duration overlap
  }
  return delays
}

export default function About() {
  const lang = useLang()
  const paragraphs = t[lang].about
  // Video at 7s (after nav), text starts after video has appeared (~10s)
  const textDelays = getDelays(paragraphs, 10)

  return (
    <motion.div className="about" {...pageTransition} key={lang}>
      <motion.div className="about-text">
        {paragraphs.map((text, i) => (
          <motion.p
            key={`${lang}-${i}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2.5, delay: textDelays[i], ease }}
          >
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div
        className="about-video"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 7, ease }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/about-video.mp4"
        />
      </motion.div>
    </motion.div>
  )
}
