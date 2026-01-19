import React from 'react'
import { X, RotateCcw, ChevronDown } from 'lucide-react'
import { themes } from '@/lib/lofi-themes'
import { Button } from '@/components/ui/button'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  currentTheme: string
  setCurrentTheme: (themeId: string) => void
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  setCurrentTheme,
}) => {
  const handleResetDefaults = () => {
    if (
      window.confirm(
        'This will reset all settings to their defaults. Continue?'
      )
    ) {
      localStorage.removeItem('lofi-volume')
      localStorage.removeItem('lofi-theme')
      localStorage.removeItem('lofi-effects-volume')
      localStorage.removeItem('lofi-effect-volumes')
      localStorage.removeItem('customChannels')
      localStorage.removeItem('hiddenDefaultChannels')
      localStorage.removeItem('customSoundEffects')

      window.location.reload()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-[var(--lofi-card-radius)] bg-[var(--lofi-card)] p-6 shadow-[var(--lofi-card-shadow)]">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-bold text-[var(--lofi-text-primary)]">
            Settings
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-[var(--lofi-text-secondary)]"
          >
            <X size={20} />
          </Button>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <label
              htmlFor="theme-select"
              className="block text-sm font-medium text-[var(--lofi-text-primary)]"
            >
              Theme
            </label>
            <div className="relative">
              <select
                id="theme-select"
                value={currentTheme}
                onChange={(e) => setCurrentTheme(e.target.value)}
                className="w-full appearance-none rounded-[var(--lofi-button-radius)] border border-[var(--lofi-border)] bg-[var(--lofi-card-hover)] px-3 py-2 text-[var(--lofi-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--lofi-accent)]"
              >
                {Object.values(themes).map((theme) => (
                  <option key={theme.id} value={theme.id}>
                    {theme.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDown
                  size={16}
                  className="text-[var(--lofi-text-primary)]"
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button
              onClick={handleResetDefaults}
              className="flex w-full items-center justify-center space-x-2"
            >
              <RotateCcw size={16} />
              <span>Restore Defaults</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsModal
