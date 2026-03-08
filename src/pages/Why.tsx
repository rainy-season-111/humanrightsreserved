import { motion, type Transition } from 'framer-motion'
import { useLang } from '../LangContext'
import { t } from '../i18n'
import './Why.css'

const ease = [0.16, 1, 0.3, 1] as const

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 2, ease } satisfies Transition,
}

// After nav finishes (~7.5s), lines come in one by one
const delays = [7, 9.5, 12, 14.5]

export default function Why() {
  const lang = useLang()
  const lines = t[lang].why

  return (
    <motion.div className="why" {...pageTransition} key={lang}>
      <div className="why-lines">
        {lines.map((text, i) => (
          <motion.p
            key={`${lang}-${i}`}
            className={`why-line why-line--${i}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 3, delay: delays[i], ease }}
          >
            {text}
          </motion.p>
        ))}
      </div>
    </motion.div>
  )
}
