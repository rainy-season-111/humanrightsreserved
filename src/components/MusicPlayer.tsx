import { useState, useRef, useEffect } from 'react'
import './MusicPlayer.css'

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.3
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => setElapsed(audio.currentTime)
    const onMeta = () => setDuration(audio.duration)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    }
  }

  const displayDuration = 3 * 60 + 33
  const progress = duration ? (elapsed / duration) * 100 : 0

  return (
    <div className="music" onClick={toggle} role="button" aria-label="Toggle music">
      <audio ref={audioRef} src="/music.mp3" loop />
      <span className="music-time">{formatTime(elapsed)}</span>
      <div className="music-progress">
        <div className="music-progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <span className="music-time">{formatTime(displayDuration)}</span>
      <div className="music-tip">
        <span className="music-tip-title">When Will We Land?</span>
        <a
          href="https://barrycantswim.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="music-tip-artist"
          onClick={e => e.stopPropagation()}
        >
          Barry Can't Swim
        </a>
      </div>
    </div>
  )
}
