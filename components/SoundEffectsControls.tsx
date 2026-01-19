import React, { useState, useEffect } from 'react'
import { Plus, Music, X } from 'lucide-react'
import { soundEffects } from '@/lib/lofi_data'
import { SoundEffect, CustomSoundEffect } from '@/types/lofi'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'

const ReactPlayer = dynamic(() => import('react-player/youtube'), {
  ssr: false,
}) as any

interface SoundEffectsControlsProps {
  activeEffects: Set<string>
  toggleEffect: (effectId: string) => void
  effectsVolume: number
  setEffectsVolume: (vol: number) => void
  effectVolumes: { [key: string]: number }
  setEffectVolumes: (volumes: { [key: string]: number }) => void
  currentTheme: string
  customEffects: CustomSoundEffect[]
  setCustomEffects: (effects: CustomSoundEffect[]) => void
  loadingEffects: Set<string>
}

const SoundEffectsControls: React.FC<SoundEffectsControlsProps> = ({
  activeEffects,
  toggleEffect,
  effectsVolume,
  setEffectsVolume,
  effectVolumes,
  setEffectVolumes,
  currentTheme,
  customEffects,
  setCustomEffects,
  loadingEffects,
}) => {
  const [isAddingEffect, setIsAddingEffect] = useState(false)
  const [newEffect, setNewEffect] = useState<CustomSoundEffect>({
    id: '',
    name: '',
    file: '',
  })
  const [urlError, setUrlError] = useState('')

  const allEffects = [
    ...soundEffects.map((effect) => ({
      ...effect,
    })),
    ...customEffects.map((effect) => ({
      ...effect,
      icon: Music,
      isCustom: true,
    })),
  ]

  const validateYoutubeUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url)
      return (
        urlObj.hostname === 'www.youtube.com' ||
        urlObj.hostname === 'youtube.com' ||
        urlObj.hostname === 'youtu.be'
      )
    } catch {
      return false
    }
  }

  const handleAddEffect = async () => {
    if (!newEffect.name || !newEffect.file) {
      alert('Please provide both name and YouTube URL')
      return
    }

    if (!validateYoutubeUrl(newEffect.file)) {
      alert('Please provide a valid YouTube URL')
      return
    }

    const effectId = `custom_${Date.now()}`
    const newCustomEffect: CustomSoundEffect = {
      id: effectId,
      name: newEffect.name,
      file: newEffect.file,
    }

    setCustomEffects([...customEffects, newCustomEffect])
    const defaultVolume = 0.5
    setEffectVolumes({
      ...effectVolumes,
      [effectId]: defaultVolume,
    })
    setIsAddingEffect(false)
    setNewEffect({ id: '', name: '', file: '' })
  }

  const handleDeleteEffect = (effectId: string) => {
    setCustomEffects(customEffects.filter((effect) => effect.id !== effectId))
    const newVolumes = { ...effectVolumes }
    delete newVolumes[effectId]
    setEffectVolumes(newVolumes)
    if (activeEffects.has(effectId)) {
      toggleEffect(effectId)
    }
  }

  const renderSoundEffect = (effect: SoundEffect) => {
    const isActive = activeEffects.has(effect.id)
    const isLoading = loadingEffects.has(effect.id)

    return (
      <div
        key={effect.id}
        className={`relative flex flex-col rounded-[var(--lofi-card-radius)] p-3 shadow-[var(--lofi-card-shadow)] transition-colors ${
          isActive
            ? 'bg-[var(--lofi-card)] ring-1 ring-[var(--lofi-accent)] ring-opacity-50'
            : 'bg-[var(--lofi-card-hover)]'
        }`}
      >
        {isActive && (
          <div className="hidden">
            <ReactPlayer
              url={effect.file}
              playing={isActive}
              volume={effectVolumes[effect.id] * effectsVolume}
              loop
              config={{
                youtube: {
                  playerVars: { controls: 0 },
                },
              }}
            />
          </div>
        )}

        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => toggleEffect(effect.id)}
              disabled={isLoading}
              size="icon"
              variant={isActive ? 'accent' : 'default'}
              className={`h-8 w-8 shadow-lg transition-all hover:translate-y-[-1px] hover:shadow-xl active:translate-y-[1px] ${
                isLoading ? 'opacity-50' : ''
              }`}
            >
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-transparent" />
              ) : (
                <effect.icon size={16} />
              )}
            </Button>
            <span className="font-mono text-xs text-[var(--lofi-text-primary)]">
              {effect.name}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs text-[var(--lofi-text-secondary)]">
              {Math.round(effectVolumes[effect.id] * 100)}%
            </span>
            {effect.isCustom && (
              <Button
                onClick={() => handleDeleteEffect(effect.id)}
                variant="default"
                size="icon"
                className="h-7 w-7 shadow-lg transition-all hover:translate-y-[-1px] hover:shadow-xl active:translate-y-[1px]"
              >
                <X size={14} />
              </Button>
            )}
          </div>
        </div>
        <Slider
          min={0}
          max={1}
          step={0.01}
          value={[effectVolumes[effect.id]]}
          onValueChange={(vals) => {
            if (!isActive && !isLoading) {
              toggleEffect(effect.id)
            }
            setEffectVolumes({
              ...effectVolumes,
              [effect.id]: vals[0],
            })
          }}
          className="w-full"
        />
      </div>
    )
  }

  useEffect(() => {
    const defaultVolume = 0.5
    const newVolumes = { ...effectVolumes }
    let hasChanges = false

    allEffects.forEach((effect) => {
      if (effectVolumes[effect.id] === undefined) {
        newVolumes[effect.id] = defaultVolume
        hasChanges = true
      }
    })

    if (hasChanges) {
      setEffectVolumes(newVolumes)
    }
  }, [allEffects, effectVolumes])

  return (
    <div className="space-y-4">
      <div className="mb-4 flex flex-row justify-between gap-4 sm:items-center">
        <h3 className="font-mono text-sm text-[var(--lofi-text-primary)]">
          Effects
        </h3>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setIsAddingEffect(true)}
            size="icon"
            className="rounded-full"
          >
            <Plus size={16} />
          </Button>
          <span className="hidden font-mono text-xs text-[var(--lofi-text-secondary)] sm:inline">
            Master Volume
          </span>
          <Slider
            min={0}
            max={1}
            step={0.01}
            value={[effectsVolume]}
            onValueChange={(vals) => setEffectsVolume(vals[0])}
            className="w-20 sm:w-20"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {allEffects.map((effect) => renderSoundEffect(effect))}
      </div>

      {isAddingEffect && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md space-y-3 rounded-[var(--lofi-card-radius)] bg-[var(--lofi-card)] p-6 shadow-[var(--lofi-card-shadow)]">
            <h3 className="text-lg font-bold text-[var(--lofi-text-primary)]">
              Add Sound Effect
            </h3>
            <Input
              placeholder="Effect Name"
              value={newEffect.name}
              onChange={(e) =>
                setNewEffect({ ...newEffect, name: e.target.value })
              }
            />
            <div className="space-y-1">
              <Input
                type="url"
                placeholder="YouTube URL"
                value={newEffect.file}
                onChange={(e) => {
                  setNewEffect({ ...newEffect, file: e.target.value })
                  setUrlError('')
                }}
                className={urlError ? 'border-red-500' : ''}
              />
              {urlError && <p className="text-xs text-red-500">{urlError}</p>}
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="ghost"
                onClick={() => setIsAddingEffect(false)}
                size="sm"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddEffect}
                variant="accent"
                size="sm"
                className="flex items-center space-x-2"
              >
                <Plus size={14} />
                <span>Add Effect</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SoundEffectsControls
