import React from 'react'
import {
  SkipBack,
  Play,
  Pause,
  SkipForward,
  VolumeX,
  Volume1,
  Volume2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'

interface PlaybackControlsProps {
  isPlaying: boolean
  setIsPlaying: (playing: boolean) => void
  volume: number
  setVolume: (vol: number) => void
  changeChannel: (direction: 'next' | 'prev') => void
}

const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  isPlaying,
  setIsPlaying,
  volume,
  setVolume,
  changeChannel,
}) => (
  <div className="flex w-full items-center justify-between sm:justify-start sm:gap-8">
    {/* Left Side - Playback Controls */}
    <div className="flex shrink-0 items-center space-x-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => changeChannel('prev')}
        className="h-8 w-8 text-[var(--lofi-text-primary)] hover:bg-[var(--lofi-card-hover)]"
      >
        <SkipBack size={14} className="sm:h-4 sm:w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsPlaying(!isPlaying)}
        className="h-8 w-8 text-[var(--lofi-text-primary)] hover:bg-[var(--lofi-card-hover)]"
      >
        {isPlaying ? (
          <Pause size={14} className="sm:h-4 sm:w-4" />
        ) : (
          <Play size={14} className="sm:h-4 sm:w-4" />
        )}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => changeChannel('next')}
        className="h-8 w-8 text-[var(--lofi-text-primary)] hover:bg-[var(--lofi-card-hover)]"
      >
        <SkipForward size={14} className="sm:h-4 sm:w-4" />
      </Button>
      {/* Right Side - Volume Control */}
      <div className="flex min-w-[90px] items-center space-x-1 sm:min-w-[110px] sm:space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setVolume(volume === 0 ? 0.5 : 0)}
          className="hidden sm:inline-flex h-8 w-8 text-[var(--lofi-text-primary)] hover:bg-[var(--lofi-card-hover)]"
        >
          {volume === 0 ? (
            <VolumeX size={14} className="sm:h-4 sm:w-4" />
          ) : volume < 0.5 ? (
            <Volume1 size={14} className="sm:h-4 sm:w-4" />
          ) : (
            <Volume2 size={14} className="sm:h-4 sm:w-4" />
          )}
        </Button>
        <Slider
          min={0}
          max={1}
          step={0.01}
          value={[volume]}
          onValueChange={(vals) => setVolume(vals[0])}
          className="w-[192px] cursor-pointer"
        />
      </div>
    </div>
  </div>
)

export default PlaybackControls
