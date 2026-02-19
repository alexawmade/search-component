import { useEffect, useRef } from 'react'
import styles from './DebugShortcut.module.css'

function DebugShortcut({ fired }) {
  const timerRef = useRef(null)
  const elRef = useRef(null)

  useEffect(() => {
    if (!fired || !elRef.current) return

    elRef.current.classList.remove(styles.visible)
    // force reflow so re-triggering replays the animation
    void elRef.current.offsetWidth
    elRef.current.classList.add(styles.visible)

    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      elRef.current?.classList.remove(styles.visible)
    }, 1400)

    return () => clearTimeout(timerRef.current)
  }, [fired])

  return (
    <div ref={elRef} className={styles.toast}>
      Keyboard shortcut intercepted
    </div>
  )
}

export default DebugShortcut
