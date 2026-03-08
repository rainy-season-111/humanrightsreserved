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

// Each line waits for nav to finish (photos at ~5.5s + 2s = 7.5s)
// Then lines come in one by one
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 1.5,
      delayChildren: 7,
    },
  },
}

const lineReveal = {
  initial: { opacity: 0, y: 6 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 2.5, ease },
  },
}

export default function About() {
  const lang = useLang()
  const paragraphs = t[lang].about

  return (
    <motion.div className="about" {...pageTransition} key={lang}>
      <motion.div
        className="about-text"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {paragraphs.map((text, i) => (
          <motion.p key={`${lang}-${i}`} variants={lineReveal}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div
        className="about-video"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 17, ease }}
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
