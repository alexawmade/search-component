# Search Component Prototype

A polished, production-quality search UI prototype built from Figma designs — no backend, no API calls. Fully client-side.

Trigger it with **⌘ K** (macOS) or **Ctrl K** (Windows).

---

## Features

- **Global search** across 8 entity types: Generators, Synthetic Datasets, Connectors, Chats, Artifacts, Datasets, Organizations, and Users
- **Smart filters** — filter by entity type, creator, and date range; all filters compose
- **Date range picker** — calendar with quick presets (Today, Last 7 days, Last 30 days), future dates blocked
- **Sort** — by relevance or creation date (newest / oldest)
- **Persistent filters** — opt-in via the settings toggle; preferences survive page reloads via localStorage
- **Initials avatars** — color-coded by name hash, pixel-perfect centered
- **Light / dark mode** — full token system, toggled via the button in the top-right corner
- **Animated grid background** — cursor-tracked spotlight effect with feathered edges
- **Keyboard-first** — Escape to close, Enter to confirm, arrow navigation

---

## Stack

- **React + Vite** — component framework and dev server
- **CSS Modules** — scoped styles, no utility-class framework
- **Figma MCP** — design-to-code via Claude's Figma plugin
- **Claude Code** — built entirely with AI pair programming

---

## Project structure

```
src/
  components/
    Search/             # Main search overlay (orchestrator + input + results)
    InFilterDropdown/   # Entity type filter
    CreatedByDropdown/  # Creator filter with search input
    DateDropdown/       # Calendar-based date range filter
    SettingsDropdown/   # Persist filters toggle
    InitialsAvatar/     # Shared avatar component
    LandingCard/        # Landing page card
    GridBackground/     # Spotlight grid effect
    ThemeToggle/        # Light/dark switcher
    FooterChip/         # Credits chip
  data/
    data.json           # Local mock data (all entity types)
```

---

Built by [Alex Ichim](https://alexichim.ai)
