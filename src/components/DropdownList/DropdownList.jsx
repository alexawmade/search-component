import styles from './DropdownList.module.css'

function DropdownList({ options = [], value, onChange }) {
  return (
    <div className={styles.list}>
      {options.map(option => (
        <button
          key={option.value}
          className={`${styles.item} ${option.value === value ? styles.selected : ''}`}
          onClick={() => onChange?.(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default DropdownList
