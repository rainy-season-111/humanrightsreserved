import { motion } from 'framer-motion'
import './NotFound.css'

const ease = [0.16, 1, 0.3, 1] as const

export default function NotFound() {
  return (
    <div className="not-found">
      <motion.div
        className="nf-top-left"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, delay: 0.5, ease }}
      >
        <span>human</span>
        <span>rights</span>
        <span>reserved</span>
      </motion.div>

      <motion.span
        className="nf-top-right"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, delay: 1, ease }}
      >
        .org
      </motion.span>

      <motion.div
        className="nf-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 2, ease }}
      >
        <span>we are all lost, until we are found.</span>
        <span className="nf-cursor" />
      </motion.div>

      <motion.span
        className="nf-bottom-left"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 3.5, ease }}
      >
        404
      </motion.span>

      <motion.span
        className="nf-bottom-right"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 3.5, ease }}
      >
        ERROR
      </motion.span>
    </div>
  )
}
