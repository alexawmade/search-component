import { useEffect, useState } from 'react'
import GridBackground from './components/GridBackground/GridBackground'
import ThemeToggle from './components/ThemeToggle/ThemeToggle'
import LandingCard from './components/LandingCard/LandingCard'
import DebugShortcut from './components/DebugShortcut/DebugShortcut'
import FooterChip from './components/FooterChip/FooterChip'
import Search from './components/Search/Search'
import './App.css'

function App() {
  const [shortcutFired, setShortcutFired] = useState(0)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setShortcutFired(n => n + 1)
        setSearchOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="app">
      <GridBackground />
      <main className="page">
        <LandingCard />
      </main>
      <ThemeToggle />
      <DebugShortcut fired={shortcutFired} />
      <FooterChip />
      <Search isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}

export default App
