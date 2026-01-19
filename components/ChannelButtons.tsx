import React from 'react'
import { Channel } from '@/types/lofi'
import { Button } from '@/components/ui/button'

interface ChannelButtonsProps {
  channels: Channel[]
  currentChannel: number
  setCurrentChannel: (index: number) => void
}

const ChannelButtons: React.FC<ChannelButtonsProps> = ({
  channels,
  currentChannel,
  setCurrentChannel,
}) => (
  <div className="flex space-x-2 overflow-x-auto pb-2">
    {channels.map((channel, idx) => (
      <Button
        key={idx}
        onClick={() => setCurrentChannel(idx)}
        variant={currentChannel === idx ? 'accent' : 'default'}
        size="sm"
        className="flex-shrink-0 font-mono h-7"
      >
        CH{idx + 1} {channel.isCustom && '★'}
      </Button>
    ))}
  </div>
)

export default ChannelButtons
