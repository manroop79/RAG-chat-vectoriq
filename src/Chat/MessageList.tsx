import type { Citation, Message } from '../types'
import { useAutoScroll } from '../utils/scroll'
import { MessageBubble } from './MessageBubble'
import { TypingIndicator } from './TypingIndicator'

type MessageListProps = {
  messages: Message[]
  isLoading: boolean
  onCitationClick: (citation: Citation, citations: Citation[]) => void
}

export const MessageList = ({ messages, isLoading, onCitationClick }: MessageListProps) => {
  const { containerRef, isAtBottom, isScrollable, scrollToBottom } =
    useAutoScroll<HTMLDivElement>([
    messages.length,
    isLoading,
    ])

  return (
    <div
      ref={containerRef}
      data-testid="message-list"
      role="log"
      aria-live="polite"
      aria-relevant="additions text"
      aria-busy={isLoading}
      className="relative flex-1 overflow-y-auto bg-slate-950/35 px-3 py-5"
    >
      <div className="w-full space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <MessageBubble message={message} onCitationClick={onCitationClick} />
          </div>
        ))}
        {isLoading ? (
          <div className="flex justify-start">
            <TypingIndicator />
          </div>
        ) : null}
      </div>
      {!isAtBottom && isScrollable ? (
        <div className="sticky bottom-4 flex justify-center pointer-events-none">
          <button
            type="button"
            onClick={scrollToBottom}
            className="pointer-events-auto inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-cyan-400/40 bg-slate-950/90 text-cyan-200 shadow-[0_8px_20px_rgba(0,0,0,0.4)] transition hover:border-cyan-300 hover:bg-slate-900"
            aria-label="Scroll to latest message"
          >
            ↓
          </button>
        </div>
      ) : null}
    </div>
  )
}

