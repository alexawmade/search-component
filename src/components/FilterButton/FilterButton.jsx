import { useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import styles from './FilterButton.module.css'

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 6h16M7 12h10M10 18h4" />
    </svg>
  )
}

function FilterButton({ active = false, onClick }) {
  const [hovered, setHovered] = useState(false)
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 })
  const wrapRef = useRef(null)
  const suppress = useRef(false)
  const timer = useRef(null)

  const handleMouseEnter = () => {
    if (suppress.current) return
    timer.current = setTimeout(() => {
      if (wrapRef.current) {
        const rect = wrapRef.current.getBoundingClientRect()
        setTooltipPos({
          top: rect.bottom + 8,
          left: rect.left + rect.width / 2,
        })
      }
      setHovered(true)
    }, 1000)
  }

  const handleMouseLeave = () => {
    clearTimeout(timer.current)
    suppress.current = false
    setHovered(false)
  }

  const handleClick = () => {
    clearTimeout(timer.current)
    setHovered(false)
    suppress.current = true
    onClick?.()
  }

  return (
    <div
      ref={wrapRef}
      className={styles.wrap}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`${styles.btn} ${active ? styles.active : ''}`}
        onClick={handleClick}
        aria-label={active ? 'Hide filters' : 'Show filters'}
        aria-pressed={active}
      >
        <span className={styles.circle}>
          <FilterIcon />
        </span>
      </button>

      {hovered && createPortal(
        <div className={styles.tooltip} style={{ top: tooltipPos.top, left: tooltipPos.left }}>
          {active ? 'Hide filters' : 'Show filters'}
        </div>,
        document.body
      )}
    </div>
  )
}

export default FilterButton
