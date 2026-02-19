import styles from './LandingCard.module.css'

const SearchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <line x1="16.5" y1="16.5" x2="22" y2="22" />
  </svg>
)

function LandingCard() {
  return (
    <div className={styles.card}>

      {/* ── Top: preview area ── */}
      <div className={styles.preview}>
        <span className={styles.badge}>Prototype</span>
        <div className={styles.previewContent}>
          <div className={styles.iconRing}>
            <SearchIcon />
          </div>
          <div className={styles.shortcutRow}>
            <kbd className={styles.key}>⌘</kbd>
            <kbd className={styles.key}>K</kbd>
            <span className={styles.shortcutOr}>or</span>
            <kbd className={styles.key}>Ctrl</kbd>
            <kbd className={styles.key}>K</kbd>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className={styles.divider} />

      {/* ── Bottom: info area ── */}
      <div className={styles.info}>

        <div className={styles.block}>
          <p className={styles.heading}>Global Search</p>
          <p className={styles.body}>
            A unified search experience across all platform entities — Generators, Synthetic Datasets, Chats, Artifacts, Connectors, and more.
          </p>
        </div>

        <div className={styles.block}>
          <p className={styles.heading}>How to trigger</p>
          <p className={styles.body}>
            Press <code className={styles.code}>⌘ K</code> on macOS or <code className={styles.code}>Ctrl K</code> on Windows anywhere on the page to open the search overlay. Results are grouped by entity type and filtered as you type.
          </p>
        </div>

        <div className={styles.block}>
          <p className={styles.heading}>Stack</p>
          <p className={styles.body}>React · Vite · Figma MCP · Claude Code</p>
        </div>

      </div>
    </div>
  )
}

export default LandingCard
