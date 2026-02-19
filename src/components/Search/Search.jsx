import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { createPortal } from 'react-dom'
import SearchInput from './SearchInput'
import SearchResult from './SearchResult'
import FilterChip from '../FilterChip/FilterChip'

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12" />
      <path d="M16 3v4" />
      <path d="M8 3v4" />
      <path d="M4 11h16" />
      <path d="M7 14h.013" />
      <path d="M10.01 14h.005" />
      <path d="M13.01 14h.005" />
      <path d="M16.015 14h.005" />
      <path d="M13.015 17h.005" />
      <path d="M7.01 17h.005" />
      <path d="M10.01 17h.005" />
    </svg>
  )
}

function FolderIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
      <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
    </svg>
  )
}

function LetterCaseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M14 15.5a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0 -7 0" />
      <path d="M3 19v-10.5a3.5 3.5 0 0 1 7 0v10.5" />
      <path d="M3 13h7" />
      <path d="M21 12v7" />
    </svg>
  )
}
import DropdownList from '../DropdownList/DropdownList'
import InFilterDropdown, { ENTITY_OPTIONS } from '../InFilterDropdown/InFilterDropdown'
import CreatedByDropdown from '../CreatedByDropdown/CreatedByDropdown'
import DateDropdown from '../DateDropdown/DateDropdown'
import SettingsDropdown from '../SettingsDropdown/SettingsDropdown'
import { useSearch } from './useSearch'
import styles from './Search.module.css'

// ── Persistence helpers — read once at module load ──
const _persistOn = (() => {
  try { return JSON.parse(localStorage.getItem('search_settings'))?.persistFilters === true }
  catch { return false }
})()

const _saved = (() => {
  if (!_persistOn) return null
  try { return JSON.parse(localStorage.getItem('search_filters')) ?? null }
  catch { return null }
})()

const RECENT = [
  { id: 'con_001', name: 'Production data warehouse', entityType: 'connector', creator: 'Alex Ichim', created_at: 'Jan 10, 2024', connector_type: 'Snowflake' },
  { id: 'gen_003', name: 'Financial fraud pattern generator', entityType: 'generator', creator: 'James Liu', created_at: 'Mar 22, 2024' },
  { id: 'sd_001', name: 'Retail customer profiles v2', entityType: 'synthetic_dataset', creator: 'Alex Ichim', created_at: 'Jan 28, 2024' },
]

const OLDER = [
  { id: 'gen_001', name: 'Customer churn simulator', entityType: 'generator', creator: 'Alex Ichim', created_at: 'Jan 15, 2024' },
  { id: 'ds_003', name: 'Transaction history 2023', entityType: 'dataset', creator: 'James Liu', created_at: 'Apr 05, 2024' },
]

const SORT_OPTIONS = [
  { value: 'best',   label: 'Best matches',        chipLabel: 'Sort' },
  { value: 'newest', label: 'Created: Newest first', chipLabel: 'Newest first' },
  { value: 'oldest', label: 'Created: Oldest first', chipLabel: 'Oldest first' },
]

function parseDate(str) {
  return new Date(str)
}

function Search({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [filterActive, setFilterActive] = useState(_saved?.filterActive ?? true)
  const [sortValue, setSortValue] = useState(_saved?.sortValue ?? 'best')
  const [titleOnly, setTitleOnly] = useState(_saved?.titleOnly ?? false)
  const [inFilter, setInFilter] = useState(_saved?.inFilter ?? [])
  const [inOpen, setInOpen] = useState(false)
  const [inPos, setInPos] = useState({ top: 0, left: 0 })
  const inRef = useRef(null)
  const [createdByFilter, setCreatedByFilter] = useState(_saved?.createdByFilter ?? [])
  const [createdByOpen, setCreatedByOpen] = useState(false)
  const [createdByPos, setCreatedByPos] = useState({ top: 0, left: 0 })
  const createdByRef = useRef(null)
  const [dateFilter, setDateFilter] = useState({ start: null, end: null })
  const [persistFilters, setPersistFilters] = useState(_persistOn)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [settingsPos, setSettingsPos] = useState({ bottom: 0, right: 0 })
  const settingsRef = useRef(null)
  const [dateOpen, setDateOpen] = useState(false)
  const [datePos, setDatePos] = useState({ top: 0, left: 0 })
  const dateRef = useRef(null)
  const [sortOpen, setSortOpen] = useState(false)
  const [sortPos, setSortPos] = useState({ top: 0, left: 0 })
  const sortRef = useRef(null)

  const results = useSearch(query, { titleOnly })
  const scrollRef = useRef(null)
  const filtersBarRef = useRef(null)
  const [hThumbLeft, setHThumbLeft] = useState(0)
  const [hThumbWidth, setHThumbWidth] = useState(0)
  const [hOverflow, setHOverflow] = useState(false)
  const fadeTimer = useRef(null)
  const [thumbTop, setThumbTop] = useState(0)
  const [thumbHeight, setThumbHeight] = useState(0)
  const [scrollbarVisible, setScrollbarVisible] = useState(false)

  const isSearching = query.trim().length > 0
  const baseItems = isSearching ? results : RECENT
  const sectionLabel = isSearching ? 'Best matches' : 'Recent'

  const sortedItems = useMemo(() => {
    if (!isSearching || sortValue === 'best') return baseItems
    return [...baseItems].sort((a, b) => {
      const diff = parseDate(a.created_at) - parseDate(b.created_at)
      return sortValue === 'newest' ? -diff : diff
    })
  }, [baseItems, sortValue, isSearching])

  const items = useMemo(() => {
    if (!isSearching) return sortedItems
    let result = sortedItems
    if (inFilter.length > 0) result = result.filter(item => inFilter.includes(item.entityType))
    if (createdByFilter.length > 0) result = result.filter(item => createdByFilter.includes(item.creator))
    if (dateFilter.start) {
      const s = dateFilter.start
      const e = dateFilter.end ?? dateFilter.start
      result = result.filter(item => {
        if (!item.created_at) return false
        const d = new Date(item.created_at)
        d.setHours(0, 0, 0, 0)
        return d >= s && d <= e
      })
    }
    return result
  }, [sortedItems, inFilter, createdByFilter, dateFilter, isSearching])

  const olderItems = useMemo(() => {
    if (!isSearching || inFilter.length === 0) return OLDER
    return OLDER.filter(item => inFilter.includes(item.entityType))
  }, [inFilter, isSearching])

  const inChipLabel = inFilter.length === 0
    ? 'In'
    : 'In: ' + inFilter.map(v => ENTITY_OPTIONS.find(o => o.value === v)?.label).join(', ')

  const createdByChipLabel = createdByFilter.length === 0
    ? 'Created by'
    : 'Created by: ' + createdByFilter.join(', ')

  const dateChipLabel = useMemo(() => {
    if (!dateFilter.start) return 'Date'
    const fmt = d => d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    const sameDayCheck = (a, b) =>
      a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
    if (!dateFilter.end || sameDayCheck(dateFilter.start, dateFilter.end)) return fmt(dateFilter.start)
    return `${fmt(dateFilter.start)} – ${fmt(dateFilter.end)}`
  }, [dateFilter])

  const updateFiltersThumb = useCallback(() => {
    const el = filtersBarRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    const overflow = scrollWidth > clientWidth
    setHOverflow(overflow)
    if (!overflow) return
    const trackWidth = Math.max(clientWidth - 24, 0) // 12px inset each side
    const thumbW = Math.max((clientWidth / scrollWidth) * trackWidth, 14)
    const maxLeft = trackWidth - thumbW
    const thumbL = (scrollLeft / (scrollWidth - clientWidth)) * maxLeft
    setHThumbWidth(thumbW)
    setHThumbLeft(thumbL)
  }, [])

  const updateThumb = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const { scrollTop, scrollHeight, clientHeight } = el
    if (scrollHeight <= clientHeight) {
      setScrollbarVisible(false)
      return
    }
    const trackHeight = clientHeight
    const thumb = Math.max((clientHeight / scrollHeight) * trackHeight, 28)
    const maxTop = trackHeight - thumb
    const top = (scrollTop / (scrollHeight - clientHeight)) * maxTop
    setThumbHeight(thumb)
    setThumbTop(top)
  }, [])

  const handleScroll = useCallback(() => {
    updateThumb()
    setScrollbarVisible(true)
    clearTimeout(fadeTimer.current)
    fadeTimer.current = setTimeout(() => setScrollbarVisible(false), 1500)
  }, [updateThumb])

  // Recalculate vertical thumb whenever content or layout changes
  useEffect(() => {
    const t = setTimeout(updateThumb, 0)
    return () => clearTimeout(t)
  }, [items, isSearching, filterActive, updateThumb])

  // Recalculate horizontal filters thumb whenever labels change
  useEffect(() => {
    const t = setTimeout(updateFiltersThumb, 0)
    return () => clearTimeout(t)
  }, [sortValue, inFilter, createdByFilter, titleOnly, filterActive, updateFiltersThumb])

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (sortOpen) { setSortOpen(false); return }
        if (inOpen) { setInOpen(false); return }
        if (createdByOpen) { setCreatedByOpen(false); return }
        if (dateOpen) { setDateOpen(false); return }
        if (settingsOpen) { setSettingsOpen(false); return }
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, sortOpen, inOpen, createdByOpen, dateOpen, settingsOpen])

  useEffect(() => {
    if (!isOpen) {
      setQuery('')
      setSortOpen(false)
      setInOpen(false)
      setCreatedByOpen(false)
      setDateOpen(false)
      setSettingsOpen(false)
      if (!persistFilters) {
        setFilterActive(true)
        setSortValue('best')
        setTitleOnly(false)
        setInFilter([])
        setCreatedByFilter([])
        setDateFilter({ start: null, end: null })
      }
    }
  }, [isOpen, persistFilters])

  // Close dropdowns when filters collapse
  useEffect(() => {
    if (!filterActive) { setSortOpen(false); setInOpen(false); setCreatedByOpen(false); setDateOpen(false) }
  }, [filterActive])

  // Auto-save filter state to localStorage when persist is on
  useEffect(() => {
    if (!persistFilters) return
    try {
      localStorage.setItem('search_filters', JSON.stringify({
        filterActive, sortValue, titleOnly, inFilter, createdByFilter,
      }))
    } catch {}
  }, [persistFilters, filterActive, sortValue, titleOnly, inFilter, createdByFilter])


  const handleInChipClick = () => {
    if (!inOpen && inRef.current) {
      const rect = inRef.current.getBoundingClientRect()
      setInPos({ top: rect.bottom + 6, left: rect.left })
    }
    setInOpen(v => !v)
  }

  const handleCreatedByChipClick = () => {
    if (!createdByOpen && createdByRef.current) {
      const rect = createdByRef.current.getBoundingClientRect()
      setCreatedByPos({ top: rect.bottom + 6, left: rect.left })
    }
    setCreatedByOpen(v => !v)
  }

  const handleSettingsBtnClick = () => {
    if (!settingsOpen && settingsRef.current) {
      const rect = settingsRef.current.getBoundingClientRect()
      setSettingsPos({ bottom: window.innerHeight - rect.top + 6, right: window.innerWidth - rect.right })
    }
    setSettingsOpen(v => !v)
  }

  const handlePersistToggle = (val) => {
    setPersistFilters(val)
    try {
      localStorage.setItem('search_settings', JSON.stringify({ persistFilters: val }))
      if (!val) localStorage.removeItem('search_filters')
    } catch {}
  }

  const handleDateChipClick = () => {
    if (!dateOpen && dateRef.current) {
      const rect = dateRef.current.getBoundingClientRect()
      setDatePos({ top: rect.bottom + 6, right: window.innerWidth - rect.right })
    }
    setDateOpen(v => !v)
  }

  const handleSortChipClick = () => {
    if (!sortOpen && sortRef.current) {
      const rect = sortRef.current.getBoundingClientRect()
      setSortPos({ top: rect.bottom + 6, left: rect.left })
    }
    setSortOpen(v => !v)
  }

  const handleSortSelect = (value) => {
    setSortValue(value)
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className={styles.overlay} onMouseDown={onClose}>
      <div className={styles.dialog} onMouseDown={e => e.stopPropagation()}>
        <SearchInput
          value={query}
          onChange={e => setQuery(e.target.value)}
          filterActive={filterActive}
          onFilterClick={() => setFilterActive(v => !v)}
        />

        <div className={`${styles.filtersWrapper} ${filterActive ? styles.filtersOpen : ''}`}>
          <div className={styles.filtersInner}>
            <div className={styles.filtersBar} ref={filtersBarRef} onScroll={updateFiltersThumb}>
              <div ref={sortRef}>
                <FilterChip
                  label={SORT_OPTIONS.find(o => o.value === sortValue).chipLabel}
                  hasDropdown
                  active={sortValue !== 'best'}
                  onClick={handleSortChipClick}
                />
              </div>
              <div className={styles.filtersDivider} />
              <FilterChip
                label="Title only"
                icon={LetterCaseIcon}
                active={titleOnly}
                onClick={() => setTitleOnly(v => !v)}
              />
              <div ref={createdByRef}>
                <FilterChip
                  label={createdByChipLabel}
                  icon={UserIcon}
                  hasDropdown
                  active={createdByFilter.length > 0}
                  onClick={handleCreatedByChipClick}
                  maxWidth="240px"
                />
              </div>
              <div ref={inRef}>
                <FilterChip
                  label={inChipLabel}
                  icon={FolderIcon}
                  hasDropdown
                  active={inFilter.length > 0}
                  onClick={handleInChipClick}
                  maxWidth="240px"
                />
              </div>
              <div ref={dateRef}>
                <FilterChip
                  label={dateChipLabel}
                  icon={CalendarIcon}
                  hasDropdown
                  active={!!dateFilter.start}
                  onClick={handleDateChipClick}
                  maxWidth="300px"
                />
              </div>
            </div>
          </div>
          {hOverflow && (
            <div className={styles.filtersScrollbar}>
              <div
                className={styles.filtersScrollbarThumb}
                style={{ left: hThumbLeft, width: hThumbWidth }}
              />
            </div>
          )}
        </div>

        <div className={styles.resultsArea}>
          <div
            className={styles.resultsWrapper}
            ref={scrollRef}
            onScroll={handleScroll}
          >
            <div className={styles.section}>
              <div className={styles.sectionLabel}>{sectionLabel}</div>
              {items.map(item => (
                <SearchResult
                  key={item.id}
                  name={item.name}
                  entityType={item.entityType}
                  creator={item.creator}
                  createdAt={item.created_at}
                  connectorType={item.connector_type}
                />
              ))}
              {isSearching && items.length === 0 && (
                <div className={styles.empty}>No results for &ldquo;{query}&rdquo;</div>
              )}
            </div>
            {!isSearching && olderItems.length > 0 && (
              <div className={styles.section}>
                <div className={styles.sectionLabel}>Older</div>
                {olderItems.map(item => (
                  <SearchResult
                    key={item.id}
                    name={item.name}
                    entityType={item.entityType}
                    creator={item.creator}
                    createdAt={item.created_at}
                    connectorType={item.connector_type}
                  />
                ))}
              </div>
            )}
          </div>

          <div className={`${styles.scrollbar} ${scrollbarVisible ? styles.scrollbarVisible : ''}`}>
            <div
              className={styles.scrollbarThumb}
              style={{ top: thumbTop, height: thumbHeight }}
            />
          </div>
        </div>

        <div className={styles.footer}>
          <span className={styles.footerHint}>Press ESC to close</span>
          <button ref={settingsRef} className={`${styles.settingsBtn} ${settingsOpen ? styles.settingsBtnOpen : ''}`} aria-label="Search settings" onClick={handleSettingsBtnClick}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        </div>
      </div>

      {inOpen && createPortal(
        <>
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 9998 }}
            onMouseDown={(e) => { e.stopPropagation(); setInOpen(false) }}
          />
          <div
            style={{ position: 'fixed', top: inPos.top, left: inPos.left, zIndex: 9999 }}
            onMouseDown={e => e.stopPropagation()}
          >
            <InFilterDropdown
              selected={inFilter}
              onChange={setInFilter}
            />
          </div>
        </>,
        document.body
      )}

      {settingsOpen && createPortal(
        <>
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 9998 }}
            onMouseDown={(e) => { e.stopPropagation(); setSettingsOpen(false) }}
          />
          <div
            style={{ position: 'fixed', bottom: settingsPos.bottom, right: settingsPos.right, zIndex: 9999 }}
            onMouseDown={e => e.stopPropagation()}
          >
            <SettingsDropdown
              persistFilters={persistFilters}
              onChange={handlePersistToggle}
            />
          </div>
        </>,
        document.body
      )}

      {dateOpen && createPortal(
        <>
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 9998 }}
            onMouseDown={(e) => { e.stopPropagation(); setDateOpen(false) }}
          />
          <div
            style={{ position: 'fixed', top: datePos.top, right: datePos.right, zIndex: 9999 }}
            onMouseDown={e => e.stopPropagation()}
          >
            <DateDropdown
              value={dateFilter}
              onChange={setDateFilter}
            />
          </div>
        </>,
        document.body
      )}

      {createdByOpen && createPortal(
        <>
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 9998 }}
            onMouseDown={(e) => { e.stopPropagation(); setCreatedByOpen(false) }}
          />
          <div
            style={{ position: 'fixed', top: createdByPos.top, left: createdByPos.left, zIndex: 9999 }}
            onMouseDown={e => e.stopPropagation()}
          >
            <CreatedByDropdown
              selected={createdByFilter}
              onChange={setCreatedByFilter}
            />
          </div>
        </>,
        document.body
      )}

      {sortOpen && createPortal(
        <>
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 9998 }}
            onMouseDown={(e) => { e.stopPropagation(); setSortOpen(false) }}
          />
          <div
            style={{ position: 'fixed', top: sortPos.top, left: sortPos.left, zIndex: 9999 }}
            onMouseDown={e => e.stopPropagation()}
          >
            <DropdownList
              options={SORT_OPTIONS}
              value={sortValue}
              onChange={handleSortSelect}
            />
          </div>
        </>,
        document.body
      )}
    </div>
  )
}

export default Search
