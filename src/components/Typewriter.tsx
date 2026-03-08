import { useState, useEffect, useRef } from 'react'

const CHAR_DELAY = 80
const LINE_PAUSE = 2400

export default function Typewriter({
  paragraphs,
  startDelay,
  lineClassName,
  fast,
  onStart,
  onComplete,
  onLineComplete,
}: {
  paragraphs: string[]
  startDelay: number
  lineClassName?: string
  fast?: boolean
  onStart?: () => void
  onComplete?: () => void
  onLineComplete?: (lineIndex: number) => void
}) {
  const [lineIndex, setLineIndex] = useState(-1)
  const [charIndex, setCharIndex] = useState(0)
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)
  const completedLinesRef = useRef<Set<number>>(new Set())
  const fastFiredRef = useRef(false)

  // Fast mode: fire all callbacks immediately
  useEffect(() => {
    if (!fast || fastFiredRef.current) return
    fastFiredRef.current = true
    onStart?.()
    paragraphs.forEach((_, i) => onLineComplete?.(i))
    onComplete?.()
  }, [fast])

  // Normal mode: start delay
  useEffect(() => {
    if (fast) return
    const id = setTimeout(() => {
      setStarted(true)
      setLineIndex(0)
      setCharIndex(0)
      onStart?.()
    }, startDelay * 1000)
    return () => clearTimeout(id)
  }, [fast, startDelay])

  // Normal mode: character by character
  useEffect(() => {
    if (fast || !started || lineIndex < 0 || lineIndex >= paragraphs.length) return

    const currentLine = paragraphs[lineIndex]

    if (charIndex < currentLine.length) {
      timerRef.current = setTimeout(() => {
        setCharIndex(prev => prev + 1)
      }, CHAR_DELAY)
    } else if (lineIndex < paragraphs.length - 1) {
      if (!completedLinesRef.current.has(lineIndex)) {
        completedLinesRef.current.add(lineIndex)
        onLineComplete?.(lineIndex)
      }
      timerRef.current = setTimeout(() => {
        setLineIndex(prev => prev + 1)
        setCharIndex(0)
      }, LINE_PAUSE)
    } else if (!done) {
      if (!completedLinesRef.current.has(lineIndex)) {
        completedLinesRef.current.add(lineIndex)
        onLineComplete?.(lineIndex)
      }
      setDone(true)
      onComplete?.()
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [fast, started, lineIndex, charIndex, paragraphs])

  // Fast mode: render all text immediately, page transition handles the entrance
  if (fast) {
    return (
      <>
        {paragraphs.map((text, i) => (
          <p key={i} className={lineClassName} style={{ position: 'relative' }}>
            <span style={{ visibility: 'hidden' }}>{text}</span>
            <span style={{ position: 'absolute', top: 0, left: 0, right: 0, textAlign: 'inherit' }}>
              {text}
            </span>
          </p>
        ))}
      </>
    )
  }

  // Normal mode: typewriter render
  return (
    <>
      {paragraphs.map((text, i) => {
        const isTyping = started && i === lineIndex
        const isDone = started && i < lineIndex
        const visible = isDone ? text : isTyping ? text.slice(0, charIndex) : ''

        return (
          <p key={i} className={lineClassName} style={{ position: 'relative' }}>
            <span style={{ visibility: 'hidden' }}>{text}</span>
            <span style={{ position: 'absolute', top: 0, left: 0, right: 0, textAlign: 'inherit' }}>
              {visible}
              {isTyping && !done && <span className="typewriter-cursor typewriter-cursor--inline" />}
            </span>
          </p>
        )
      })}
    </>
  )
}
