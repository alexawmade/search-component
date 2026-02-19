import styles from './InitialsAvatar.module.css'

const COLORS = [
  '#4f7fc4',
  '#5a9e6f',
  '#c47a4a',
  '#8668b0',
  '#b85555',
  '#4a9e9e',
  '#9e7840',
  '#6b8f8f',
]

function getColor(name) {
  let hash = 0
  for (const ch of name) hash = ch.charCodeAt(0) + ((hash << 5) - hash)
  return COLORS[Math.abs(hash) % COLORS.length]
}

function getInitials(name) {
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ''
  const last = parts[1]?.[0] ?? ''
  return (first + last).toUpperCase()
}

function InitialsAvatar({ name, size = 24 }) {
  return (
    <div
      className={styles.avatar}
      style={{
        width: size,
        height: size,
        background: getColor(name),
      }}
    >
      <span
        className={styles.initials}
        style={{ fontSize: Math.round(size * 0.42) }}
      >
        {getInitials(name)}
      </span>
    </div>
  )
}

export default InitialsAvatar
