import type { Conversation } from '../types'
import { Button } from '../Common/Button'

type ConversationSidebarProps = {
  conversations: Conversation[]
  activeConversationId: string | null
  onSelect: (conversationId: string) => void
  onNewChat: () => void
  variant?: 'sidebar' | 'compact'
  className?: string
}

export const ConversationSidebar = ({
  conversations,
  activeConversationId,
  onSelect,
  onNewChat,
  variant = 'sidebar',
  className = '',
}: ConversationSidebarProps) => (
  <aside
    data-testid={`conversation-${variant}`}
    className={`flex border-slate-800/70 bg-transparent ${
      variant === 'sidebar'
        ? 'h-full w-72 flex-col border-r'
        : 'w-full flex-col border-b'
    } ${className}`}
  >
    <div className="border-b border-slate-800/70 p-4">
      <Button variant="primary" className="w-full" onClick={onNewChat}>
        New Chat
      </Button>
    </div>
    <div
      className={`p-2 ${
        variant === 'sidebar' ? 'flex-1 overflow-y-auto' : 'overflow-x-auto'
      }`}
    >
      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Conversations
      </p>
      <div className={variant === 'sidebar' ? 'space-y-2' : 'flex gap-2'}>
        {conversations.map((conversation) => {
          const isActive = conversation.id === activeConversationId
          return (
            <button
              key={conversation.id}
              type="button"
              onClick={() => onSelect(conversation.id)}
              className={`cursor-pointer rounded-lg px-3 py-2 text-left text-sm transition ${
                variant === 'sidebar' ? 'w-full' : 'min-w-[12rem]'
              } ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-200 ring-1 ring-cyan-400/40'
                  : 'border border-slate-800/70 bg-slate-950/30 text-slate-200 hover:border-slate-600 hover:bg-slate-900/70'
              }`}
            >
              <p className="font-semibold">{conversation.title}</p>
              <p className="text-xs opacity-70">{conversation.messages.length} messages</p>
            </button>
          )
        })}
      </div>
    </div>
  </aside>
)

