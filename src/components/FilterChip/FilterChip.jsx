import styles from './FilterChip.module.css'

function SortIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 9l4 -4l4 4m-4 -4v14" />
      <path d="M21 15l-4 4l-4 -4m4 4v-14" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <div className={styles.chevronClip}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9l6 6l6 -6" />
      </svg>
    </div>
  )
}

function FilterChip({ label, icon: Icon = SortIcon, active = false, hasDropdown = false, onClick, maxWidth }) {
  return (
    <button
      className={`${styles.chip} ${active ? styles.active : ''}`}
      onClick={onClick}
      aria-pressed={active}
      style={maxWidth ? { maxWidth } : undefined}
    >
      <Icon />
      <span className={styles.label}>{label}</span>
      {hasDropdown && <ChevronIcon />}
    </button>
  )
}

export default FilterChip
