import { useEffect, useRef, useState } from 'react'
import data from '../../data/data.json'
import InitialsAvatar from '../InitialsAvatar/InitialsAvatar'
import styles from './CreatedByDropdown.module.css'

const CURRENT_USER = 'Alex Ichim'

const ALL_USERS = data.user_profiles.map(u => u.name)

function ClearIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M15 9l-6 6M9 9l6 6" />
    </svg>
  )
}

function CreatedByDropdown({ selected, onChange }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 0)
    return () => clearTimeout(t)
  }, [])

  const unselected = ALL_USERS.filter(name => !selected.includes(name))

  const filtered = unselected
    .filter(name => !query.trim() || name.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5)

  const addUser = (name) => {
    onChange([...selected, name])
    setQuery('')
    inputRef.current?.focus()
  }

  const removeUser = (name) => onChange(selected.filter(n => n !== name))
  const clearAll = () => onChange([])

  return (
    <div className={styles.panel}>
      {selected.length > 0 && (
        <div className={styles.chipsBox}>
          <div className={styles.chips}>
            {selected.map(name => (
              <span key={name} className={styles.chip}>
                {name}
                <button
                  className={styles.chipRemove}
                  onClick={() => removeUser(name)}
                  aria-label={`Remove ${name}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <button className={styles.clearAll} onClick={clearAll} aria-label="Clear all">
            <ClearIcon />
          </button>
        </div>
      )}

      <div className={styles.searchBox}>
        <input
          ref={inputRef}
          className={styles.searchInput}
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search people"
        />
      </div>

      <div className={styles.list}>
        {filtered.map(name => (
          <button key={name} className={styles.item} onClick={() => addUser(name)}>
            <InitialsAvatar name={name} size={22} />
            <span>
              {name}
              {name === CURRENT_USER && <span className={styles.you}> (You)</span>}
            </span>
          </button>
        ))}
        {filtered.length === 0 && query.trim() && (
          <div className={styles.empty}>No matches for &ldquo;{query}&rdquo;</div>
        )}
      </div>
    </div>
  )
}

export default CreatedByDropdown
