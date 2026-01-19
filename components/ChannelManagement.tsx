import React from 'react'
import { Edit2, X, Plus, Save } from 'lucide-react'
import { Channel } from '@/types/lofi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

interface ChannelManagementProps {
  isAddingChannel: boolean
  setIsAddingChannel: (adding: boolean) => void
  newChannel: Channel
  setNewChannel: (channel: Channel) => void
  saveChannel: () => void
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
  currentChannel,
  handleEditChannel,
  setShowDeleteConfirm,
}) => (
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

    <Dialog 
      open={isAddingChannel} 
      onOpenChange={(open) => !open && setIsAddingChannel(false)}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Channel</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-3 py-4">
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
        <DialogFooter className="sm:justify-end">
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
            className="flex"
          >
            <Save />
            <span>Save Channel</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
)

export default ChannelManagement
