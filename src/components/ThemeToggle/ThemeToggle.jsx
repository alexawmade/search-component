import { useState, useCallback, useEffect } from 'react'
import styles from './ThemeToggle.module.css'

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2" x2="12" y2="4" />
    <line x1="12" y1="20" x2="12" y2="22" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="2" y1="12" x2="4" y2="12" />
    <line x1="20" y1="12" x2="22" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
)

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

// phase: 'idle' | 'exiting' | 'entering'
function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)
  const [phase, setPhase] = useState('idle')

  const toggle = useCallback(() => {
    if (phase !== 'idle') return

    setPhase('exiting')

    setTimeout(() => {
      setIsDark(d => !d)
      setPhase('entering')

      setTimeout(() => setPhase('idle'), 200)
    }, 140)
  }, [phase])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const iconClass = [
    styles.iconInner,
    phase === 'exiting' ? styles.exiting : '',
    phase === 'entering' ? styles.entering : '',
  ].join(' ')

  return (
    <button
      className={styles.toggle}
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className={styles.iconClip}>
        <span className={iconClass}>
          {isDark ? <SunIcon /> : <MoonIcon />}
        </span>
      </span>
    </button>
  )
}

export default ThemeToggle
