import React from 'react'
import { RotateCcw } from 'lucide-react'
import { themes } from '@/lib/lofi-themes'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <label
              htmlFor="theme-select"
              className="block text-sm font-medium text-[var(--lofi-text-primary)]"
            >
              Theme
            </label>
            <Select value={currentTheme} onValueChange={setCurrentTheme}>
              <SelectTrigger id="theme-select">
                <SelectValue placeholder="Select a theme" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(themes).map((theme) => (
                  <SelectItem key={theme.id} value={theme.id}>
                    {theme.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4">
            <Button
              onClick={handleResetDefaults}
              className="flex w-full items-center justify-center"
            >
              <RotateCcw />
              <span>Restore Defaults</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SettingsModal
