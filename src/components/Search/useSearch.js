import { useState, useEffect } from 'react'
import data from '../../data/data.json'

const ENTITY_TYPE_MAP = {
  generators: 'generator',
  synthetic_datasets: 'synthetic_dataset',
  chats: 'chat',
  artifacts: 'artifact',
  connectors: 'connector',
  datasets: 'dataset',
  organizations: 'organization',
  user_profiles: 'user_profile',
}

const CURRENT_USER = 'Alex Ichim'

// Flatten all entities into one searchable list at module load time
const ALL_ITEMS = Object.entries(data).flatMap(([key, entries]) => {
  const entityType = ENTITY_TYPE_MAP[key]
  const filtered = entityType === 'chat'
    ? entries.filter(e => e.creator === CURRENT_USER)
    : entries
  return filtered.map(entry => ({ ...entry, entityType }))
})

export function useSearch(query, { titleOnly = false } = {}) {
  const [results, setResults] = useState([])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const timer = setTimeout(() => {
      const q = query.toLowerCase()
      const matches = ALL_ITEMS.filter(item => {
        if (titleOnly) {
          return item.name.toLowerCase().includes(q)
        }
        return (
          item.name.toLowerCase().includes(q) ||
          item.entityType.toLowerCase().includes(q) ||
          item.creator?.toLowerCase().includes(q) ||
          (item.connector_type && item.connector_type.toLowerCase().includes(q))
        )
      })
      setResults(matches)
    }, 200)

    return () => clearTimeout(timer)
  }, [query, titleOnly])

  return results
}
