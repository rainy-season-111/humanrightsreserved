import { motion, type Transition } from 'framer-motion'
import { useLang } from '../LangContext'
import { t } from '../i18n'
import './About.css'

const ease = [0.16, 1, 0.3, 1] as const

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 1, ease } satisfies Transition,
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.4,
    },
  },
}

const lineReveal = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.4, ease },
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
        transition={{ duration: 2, delay: 0.8, ease }}
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
