import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'
import { Map, MapControls } from '#/components/ui/map'

export const Route = createFileRoute('/map')({
  component: MapPage,
})

type ThemeMode = 'light' | 'dark'

function resolveTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light'

  const root = document.documentElement
  if (root.classList.contains('dark')) return 'dark'
  if (root.classList.contains('light')) return 'light'

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function MapPage() {
  const [theme, setTheme] = useState<ThemeMode>('light')

  useEffect(() => {
    const syncTheme = () => setTheme(resolveTheme())
    syncTheme()

    const observer = new MutationObserver(syncTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    media.addEventListener('change', syncTheme)

    return () => {
      observer.disconnect()
      media.removeEventListener('change', syncTheme)
    }
  }, [])

  return (
    <main className="page-wrap px-4 pb-4 pt-14">
      <section className="island-shell rise-in flex h-[calc(100vh-7rem)] flex-col overflow-hidden rounded-[2rem]">
        <header className="flex items-center justify-between gap-3 border-b border-[var(--line)] px-4 py-3 sm:px-6">
          <div>
            <p className="island-kicker mb-1">AquaPulse US · California</p>
            <h1 className="m-0 text-lg font-semibold text-[var(--sea-ink)] sm:text-xl">
              California Water Health (Prototype)
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full border-[var(--chip-line)] bg-[var(--chip-bg)] text-[var(--sea-ink)]"
            >
              Show Sources
            </Button>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          <div className="relative flex-1">
            <Map
              className="absolute inset-0"
              theme={theme}
              center={[-119.5, 37.25]}
              zoom={5}
              maxZoom={16}
            >
              <MapControls position="top-right" showZoom showCompass />
            </Map>
          </div>

          <aside className="hidden w-[320px] shrink-0 border-l border-[var(--line)] bg-[var(--header-bg)]/70 p-4 backdrop-blur-md sm:block">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--sea-ink-soft)]">
              Deep Dive
            </p>
            <p className="m-0 text-sm text-[var(--sea-ink-soft)]">
              Select a water body on the map to see its AquaPulse score, human vs. ecological health, and
              contaminant history.
            </p>
          </aside>
        </div>
      </section>
    </main>
  )
}

