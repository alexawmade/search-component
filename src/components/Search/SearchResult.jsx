import styles from './SearchResult.module.css'
import InitialsAvatar from '../InitialsAvatar/InitialsAvatar'

const ENTITY_LABELS = {
  generator: 'Generator',
  connector: 'Connector',
  synthetic_dataset: 'Synthetic Dataset',
  chat: 'Chat',
  artifact: 'Artifact',
  dataset: 'Dataset',
  organization: 'Organization',
  user_profile: 'User',
}

function CpuIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2" />
    </svg>
  )
}

function ConnectorIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 15L5.625 12.375M11.25 3L8.625 5.625M15 6.75L12.375 9.375M7.33875 4.5L13.5 10.6613L11.9595 12.2017C11.5579 12.6194 11.077 12.9528 10.545 13.1824C10.013 13.412 9.44058 13.5332 8.86118 13.5389C8.28178 13.5445 7.70706 13.4346 7.17066 13.2155C6.63425 12.9964 6.14694 12.6725 5.73722 12.2628C5.3275 11.8531 5.00361 11.3657 4.7845 10.8293C4.56539 10.2929 4.45546 9.71822 4.46115 9.13882C4.46683 8.55942 4.58801 7.98698 4.8176 7.45497C5.04719 6.92297 5.38057 6.4421 5.79825 6.0405L7.33875 4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DatasetIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
      <path d="M12 12l8 -4.5" />
      <path d="M12 12l0 9" />
      <path d="M12 12l-8 -4.5" />
      <path d="M16 5.25l-8 4.5" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 20l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c3.255 2.777 3.695 7.266 1.029 10.501c-2.666 3.235 -7.615 4.215 -11.574 2.293l-4.7 1" />
    </svg>
  )
}

function SyntheticDatasetIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M19 22.5a4.75 4.75 0 0 1 3.5 -3.5a4.75 4.75 0 0 1 -3.5 -3.5a4.75 4.75 0 0 1 -3.5 3.5a4.75 4.75 0 0 1 3.5 3.5" />
      <path d="M12 21h-7a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7" />
      <path d="M3 10h18" />
      <path d="M10 3v18" />
    </svg>
  )
}

function UserProfileIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 10a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
    </svg>
  )
}

function OrganizationIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

function ArtifactIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4" />
      <path d="M14 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4" />
      <path d="M4 15a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4" />
      <path d="M14 15a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4" />
    </svg>
  )
}

function EnterIcon() {
  return (
    <svg className={styles.enter} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 10 4 15 9 20" />
      <path d="M20 4v7a4 4 0 0 1-4 4H4" />
    </svg>
  )
}

function Chip({ label }) {
  return <span className={styles.chip}>{label}</span>
}

function Meta({ creator, createdAt }) {
  return (
    <div className={styles.meta}>
      <span>{creator}</span>
      <span>•</span>
      <span>Created {createdAt}</span>
    </div>
  )
}

const HIDE_META = new Set(['user_profile', 'organization'])

const ICONS = {
  chat: ChatIcon,
  connector: ConnectorIcon,
  dataset: DatasetIcon,
  synthetic_dataset: SyntheticDatasetIcon,
  artifact: ArtifactIcon,
  organization: OrganizationIcon,
  user_profile: UserProfileIcon,
}

function SearchResult({ name, entityType, creator, createdAt, connectorType }) {
  const Icon = ICONS[entityType] ?? CpuIcon
  const entityLabel = ENTITY_LABELS[entityType] ?? entityType

  return (
    <div className={styles.row}>
      <div className={styles.contents}>
        {entityType === 'user_profile'
          ? <InitialsAvatar name={name} size={18} />
          : <Icon />
        }
        <div className={styles.info}>
          <span className={styles.name}>{name}</span>
          <Chip label={entityLabel} />
          {connectorType && <Chip label={connectorType} />}
          {!HIDE_META.has(entityType) && (creator || createdAt) && <Meta creator={creator} createdAt={createdAt} />}
        </div>
      </div>
      <EnterIcon />
    </div>
  )
}

export default SearchResult
