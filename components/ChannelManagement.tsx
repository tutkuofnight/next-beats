import React from 'react'
import { Edit2, X, Plus, Save } from 'lucide-react'
import { Channel } from '@/types/lofi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ChannelManagementProps {
  isAddingChannel: boolean
  setIsAddingChannel: (adding: boolean) => void
  newChannel: Channel
  setNewChannel: (channel: Channel) => void
  saveChannel: () => void
  currentTheme: string
  currentChannel: number
  handleEditChannel: (index: number) => void
  setShowDeleteConfirm: (channelIndex: number) => void
}

const ChannelManagement: React.FC<ChannelManagementProps> = ({
  isAddingChannel,
  setIsAddingChannel,
  newChannel,
  setNewChannel,
  saveChannel,
  currentTheme,
  currentChannel,
  handleEditChannel,
  setShowDeleteConfirm,
}) => (
  <div
    className={
      isAddingChannel
        ? 'fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'
        : 'flex items-center space-x-2'
    }
  >
    {!isAddingChannel ? (
      <div className="flex items-center space-x-2">
        <Button
          onClick={() => handleEditChannel(currentChannel)}
          size="icon"
          variant="default"
        >
          <Edit2 size={16} />
        </Button>
        <Button
          onClick={() => setShowDeleteConfirm(currentChannel)}
          size="icon"
          variant="default"
        >
          <X size={16} />
        </Button>
        <Button
          onClick={() => setIsAddingChannel(true)}
          size="icon"
          variant="default"
        >
          <Plus size={16} />
        </Button>
      </div>
    ) : (
      <div className="w-full max-w-md space-y-3 rounded-[var(--lofi-card-radius)] bg-[var(--lofi-card)] p-6 shadow-[var(--lofi-card-shadow)]">
        <h3 className="text-lg font-bold text-[var(--lofi-text-primary)]">
          Add New Channel
        </h3>
        <div className="grid grid-cols-1 gap-3">
          <Input
            placeholder="Channel Name"
            value={newChannel.name}
            onChange={(e) =>
              setNewChannel({ ...newChannel, name: e.target.value })
            }
          />
          <Input
            placeholder="YouTube URL"
            value={newChannel.url}
            onChange={(e) =>
              setNewChannel({ ...newChannel, url: e.target.value })
            }
          />
          <Input
            placeholder="Description"
            value={newChannel.description}
            onChange={(e) =>
              setNewChannel({ ...newChannel, description: e.target.value })
            }
          />
          <Input
            placeholder="Creator"
            value={newChannel.creator}
            onChange={(e) =>
              setNewChannel({ ...newChannel, creator: e.target.value })
            }
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button
            variant="ghost"
            onClick={() => setIsAddingChannel(false)}
            size="sm"
          >
            Cancel
          </Button>
          <Button
            onClick={saveChannel}
            variant="accent"
            size="sm"
          >
            <Save size={14} />
            <span>Save Channel</span>
          </Button>
        </div>
      </div>
    )}
  </div>
)

export default ChannelManagement
