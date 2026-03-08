import { useLang } from '../LangContext'
import { t } from '../i18n'
import Typewriter from '../components/Typewriter'
import './Why.css'

export default function Why({ logoTyped, onTypingStart, onTypingDone }: { logoTyped?: boolean; onTypingStart?: () => void; onTypingDone?: () => void }) {
  const lang = useLang()
  const lines = t[lang].why

  return (
    <div className="why" key={lang}>
      <div className="why-lines">
        <Typewriter paragraphs={lines} startDelay={logoTyped ? 2.5 : 999} lineClassName="why-line" onStart={onTypingStart} onComplete={onTypingDone} />
      </div>
    </div>
  )
}
