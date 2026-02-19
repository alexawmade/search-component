import FilterButton from '../FilterButton/FilterButton'
import styles from './SearchInput.module.css'

function SearchIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13 13L16.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function SearchInput({ value, onChange, filterActive, onFilterClick }) {
  return (
    <div className={styles.row}>
      <div className={styles.searchBar}>
        <SearchIcon />
        <input
          className={styles.input}
          type="text"
          placeholder="Search by name, type, or creator..."
          value={value}
          onChange={onChange}
          autoFocus
          autoComplete="off"
          spellCheck={false}
        />
      </div>
      <div className={styles.filterWrap}>
        <FilterButton active={filterActive} onClick={onFilterClick} />
      </div>
    </div>
  )
}

export default SearchInput
