import { motion, type Transition } from 'framer-motion'
import './Why.css'

const ease = [0.16, 1, 0.3, 1] as const

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 1, ease } satisfies Transition,
}

const lines = [
  { text: 'create jobs for costa ricans.', delay: 0.5 },
  { text: 'inspire others to follow their dreams.', delay: 1.0 },
  { text: 'enjoy the life...', delay: 1.5 },
]

export default function Why() {
  return (
    <motion.div className="why" {...pageTransition}>
      <div className="why-lines">
        {lines.map(({ text, delay }, i) => (
          <motion.p
            key={text}
            className={`why-line why-line--${i}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, delay, ease }}
          >
            {text}
          </motion.p>
        ))}
      </div>
    </motion.div>
  )
}
