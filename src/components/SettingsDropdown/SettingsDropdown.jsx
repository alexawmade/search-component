import styles from './SettingsDropdown.module.css'

function SettingsDropdown({ persistFilters, onChange }) {
  return (
    <div className={styles.panel}>
      <div className={styles.row} onClick={() => onChange(!persistFilters)}>
        <span className={styles.label}>Persist filters across sessions</span>
        <button
          role="switch"
          aria-checked={persistFilters}
          className={`${styles.toggle} ${persistFilters ? styles.toggleOn : ''}`}
          onClick={e => { e.stopPropagation(); onChange(!persistFilters) }}
        >
          <span className={styles.thumb} />
        </button>
      </div>
    </div>
  )
}

export default SettingsDropdown
