import { useState, useMemo } from 'react'
import styles from './DateDropdown.module.css'

const DAY_HEADERS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function sameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function buildCalendarDays(year, month) {
  const firstDayOfWeek = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prevMonth = month === 0 ? 11 : month - 1
  const prevYear = month === 0 ? year - 1 : year
  const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate()

  const nextMonth = month === 11 ? 0 : month + 1
  const nextYear = month === 11 ? year + 1 : year

  const cells = []

  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, month: prevMonth, year: prevYear, current: false })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, month, year, current: true })
  }
  let d = 1
  while (cells.length < 42) {
    cells.push({ day: d++, month: nextMonth, year: nextYear, current: false })
  }

  return cells
}

function ChevronLeftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

function DateDropdown({ value, onChange }) {
  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const [viewYear, setViewYear] = useState(
    () => value.start ? value.start.getFullYear() : today.getFullYear()
  )
  const [viewMonth, setViewMonth] = useState(
    () => value.start ? value.start.getMonth() : today.getMonth()
  )

  const cells = useMemo(() => buildCalendarDays(viewYear, viewMonth), [viewYear, viewMonth])

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  const makeDate = (year, month, day) => {
    const d = new Date(year, month, day)
    d.setHours(0, 0, 0, 0)
    return d
  }

  const handleDayClick = (date) => {
    const { start, end } = value
    if (!start || end) {
      onChange({ start: date, end: null })
    } else if (sameDay(date, start)) {
      onChange({ start: null, end: null })
    } else if (date < start) {
      onChange({ start: date, end: start })
    } else {
      onChange({ start, end: date })
    }
  }

  const setToday = () => {
    const d = new Date(); d.setHours(0, 0, 0, 0)
    onChange({ start: d, end: d })
  }
  const setLast7 = () => {
    const end = new Date(); end.setHours(0, 0, 0, 0)
    const start = new Date(end); start.setDate(start.getDate() - 6)
    onChange({ start, end })
  }
  const setLast30 = () => {
    const end = new Date(); end.setHours(0, 0, 0, 0)
    const start = new Date(end); start.setDate(start.getDate() - 29)
    onChange({ start, end })
  }
  const clearDate = () => onChange({ start: null, end: null })

  const hasRange = value.start && value.end && !sameDay(value.start, value.end)

  return (
    <div className={styles.panel}>
      {/* Quick options — Today + Clear date share one row */}
      <div className={styles.quickRow}>
        <button className={styles.quickBtn} onClick={setToday}>Today</button>
        <button className={`${styles.quickBtn} ${styles.clearBtn}`} onClick={clearDate}>Clear date</button>
      </div>
      <div className={styles.quickList}>
        <button className={styles.quickBtn} onClick={setLast7}>Last 7 days</button>
        <button className={styles.quickBtn} onClick={setLast30}>Last 30 days</button>
      </div>

      <div className={styles.divider} />

      {/* Calendar header */}
      <div className={styles.calHeader}>
        <span className={styles.monthLabel}>{MONTH_NAMES[viewMonth].slice(0, 3)} {viewYear}</span>
        <div className={styles.navBtns}>
          <button className={styles.navBtn} onClick={prevMonth} aria-label="Previous month">
            <ChevronLeftIcon />
          </button>
          <button className={styles.navBtn} onClick={nextMonth} aria-label="Next month">
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className={styles.dayHeaders}>
        {DAY_HEADERS.map(h => (
          <div key={h} className={styles.dayHeader}>{h}</div>
        ))}
      </div>

      {/* Day grid */}
      <div className={styles.grid}>
        {cells.map((cell, i) => {
          const date = makeDate(cell.year, cell.month, cell.day)
          const isToday = sameDay(date, today)
          const isFuture = date > today
          const isDisabled = !cell.current || isFuture
          const isStart = value.start && sameDay(date, value.start)
          const isEnd = value.end && sameDay(date, value.end)
          const isSelected = isStart || isEnd
          const isRangeStart = hasRange && isStart
          const isRangeEnd = hasRange && isEnd
          const isInRange = hasRange && value.start && value.end && date > value.start && date < value.end

          const cellClass = [
            styles.dayCell,
            isRangeStart && styles.rangeStart,
            isRangeEnd && styles.rangeEnd,
            isInRange && styles.inRange,
          ].filter(Boolean).join(' ')

          const dayClass = [
            styles.day,
            isSelected ? styles.selected : isToday ? styles.today : null,
            isDisabled && styles.muted,
          ].filter(Boolean).join(' ')

          return (
            <div key={i} className={cellClass}>
              <button
                className={dayClass}
                onClick={() => !isDisabled && handleDayClick(date)}
                tabIndex={isDisabled ? -1 : 0}
              >
                {cell.day}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DateDropdown
