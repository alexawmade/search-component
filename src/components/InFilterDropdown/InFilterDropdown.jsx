import styles from './InFilterDropdown.module.css'

function CpuIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2" />
    </svg>
  )
}

function ConnectorIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 15L5.625 12.375M11.25 3L8.625 5.625M15 6.75L12.375 9.375M7.33875 4.5L13.5 10.6613L11.9595 12.2017C11.5579 12.6194 11.077 12.9528 10.545 13.1824C10.013 13.412 9.44058 13.5332 8.86118 13.5389C8.28178 13.5445 7.70706 13.4346 7.17066 13.2155C6.63425 12.9964 6.14694 12.6725 5.73722 12.2628C5.3275 11.8531 5.00361 11.3657 4.7845 10.8293C4.56539 10.2929 4.45546 9.71822 4.46115 9.13882C4.46683 8.55942 4.58801 7.98698 4.8176 7.45497C5.04719 6.92297 5.38057 6.4421 5.79825 6.0405L7.33875 4.5Z" strokeWidth="1.5" />
    </svg>
  )
}

function SyntheticDatasetIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M19 22.5a4.75 4.75 0 0 1 3.5 -3.5a4.75 4.75 0 0 1 -3.5 -3.5a4.75 4.75 0 0 1 -3.5 3.5a4.75 4.75 0 0 1 3.5 3.5" />
      <path d="M12 21h-7a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7" />
      <path d="M3 10h18" />
      <path d="M10 3v18" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 20l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c3.255 2.777 3.695 7.266 1.029 10.501c-2.666 3.235 -7.615 4.215 -11.574 2.293l-4.7 1" />
    </svg>
  )
}

function ArtifactIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4" />
      <path d="M14 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4" />
      <path d="M4 15a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4" />
      <path d="M14 15a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4" />
    </svg>
  )
}

function DatasetIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
      <path d="M12 12l8 -4.5" />
      <path d="M12 12l0 9" />
      <path d="M12 12l-8 -4.5" />
      <path d="M16 5.25l-8 4.5" />
    </svg>
  )
}

function OrganizationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 21l18 0" />
      <path d="M5 21v-14l8 -4v18" />
      <path d="M19 21v-10l-6 -4" />
      <path d="M9 9l0 .01" />
      <path d="M9 12l0 .01" />
      <path d="M9 15l0 .01" />
      <path d="M9 18l0 .01" />
    </svg>
  )
}

function UserProfileIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 10a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
    </svg>
  )
}

function ClearIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M15 9l-6 6M9 9l6 6" />
    </svg>
  )
}

export const ENTITY_OPTIONS = [
  { value: 'generator',        label: 'Generators',        icon: CpuIcon },
  { value: 'connector',        label: 'Connectors',        icon: ConnectorIcon },
  { value: 'synthetic_dataset', label: 'Synthetic Datasets', icon: SyntheticDatasetIcon },
  { value: 'chat',             label: 'Chats',             icon: ChatIcon },
  { value: 'artifact',         label: 'Artifacts',         icon: ArtifactIcon },
  { value: 'dataset',          label: 'Datasets',          icon: DatasetIcon },
  { value: 'organization',     label: 'Organizations',     icon: OrganizationIcon },
  { value: 'user_profile',     label: 'Users',             icon: UserProfileIcon },
]

function InFilterDropdown({ selected, onChange }) {
  const unselected = ENTITY_OPTIONS.filter(o => !selected.includes(o.value))

  const addItem = (value) => onChange([...selected, value])
  const removeItem = (value) => onChange(selected.filter(v => v !== value))
  const clearAll = () => onChange([])

  return (
    <div className={styles.panel}>
      {selected.length > 0 && (
        <div className={styles.chipsBox}>
          <div className={styles.chips}>
            {selected.map(value => {
              const option = ENTITY_OPTIONS.find(o => o.value === value)
              return (
                <span key={value} className={styles.chip}>
                  {option.label}
                  <button
                    className={styles.chipRemove}
                    onClick={() => removeItem(value)}
                    aria-label={`Remove ${option.label}`}
                  >
                    ×
                  </button>
                </span>
              )
            })}
          </div>
          <button
            className={styles.clearAll}
            onClick={clearAll}
            aria-label="Clear all filters"
          >
            <ClearIcon />
          </button>
        </div>
      )}

      <div className={styles.list}>
        <button
          className={`${styles.item} ${selected.length === 0 ? styles.itemSelected : ''}`}
          onClick={clearAll}
        >
          All
        </button>
        {unselected.map(option => {
          const Icon = option.icon
          return (
            <button
              key={option.value}
              className={styles.item}
              onClick={() => addItem(option.value)}
            >
              <Icon />
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default InFilterDropdown
