import { motion, type Transition } from 'framer-motion'
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

const paragraphs = [
  'by the way of the magic of the universe, we found ourselves calling the beautiful country of costa rica home.',
  'during our first rainy season, we would sit and listen to the endless sound of the rain.',
  'asking ourselves questions such as',
  '\u201Cwhat do you want to do with your time on earth?\u201D, \u201Cwhat is important to you?\u201D, and \u201Cwhat brings you joy?\u201D.',
  'so inspired by the patience, resilience, gratitude and brilliance of the people and country of costa rica',
  'we started building...',
]

export default function About() {
  return (
    <motion.div className="about" {...pageTransition}>
      <motion.div
        className="about-text"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {paragraphs.map((text, i) => (
          <motion.p key={i} variants={lineReveal}>
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
