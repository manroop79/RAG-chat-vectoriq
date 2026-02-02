import type { Citation, Message } from '../types'

type MessageBubbleProps = {
  message: Message
  onCitationClick: (citation: Citation, citations: Citation[]) => void
}

export const MessageBubble = ({ message, onCitationClick }: MessageBubbleProps) => {
  const isUser = message.role === 'user'
  const citations = message.citations ?? []
  const bubbleStyles = isUser
    ? 'ml-auto bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 px-4 py-2.5'
    : message.status === 'error'
      ? 'mr-auto border border-red-500/40 bg-red-500/10 text-red-200 px-3 py-2'
      : 'mr-auto border border-slate-800 bg-slate-900/80 text-slate-100 px-3 py-2'

  return (
    <div className="space-y-2">
      <div className={`w-fit min-w-[4.5rem] max-w-[78%] rounded-2xl text-sm ${bubbleStyles}`}>
        <p className="whitespace-pre-wrap break-words leading-relaxed">{message.content}</p>
      </div>
      {!isUser && citations.length > 0 ? (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-300/80">
            Sources ({citations.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {citations.map((citation, index) => (
              <button
                key={citation.id}
                type="button"
                onClick={() => onCitationClick(citation, citations)}
                className="group flex max-w-xs cursor-pointer flex-col gap-1 rounded-xl border border-slate-800/70 bg-slate-950/30 px-3 py-2 text-left text-xs text-slate-200 shadow-sm transition hover:border-cyan-400/60 hover:bg-cyan-500/10"
                aria-label={`Open citation ${index + 1}: ${citation.title}, page ${citation.page}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold">{index + 1}. {citation.title}</span>
                  <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] text-amber-200">
                    C{index + 1}
                  </span>
                </div>
                <span className="line-clamp-2 text-[11px] text-slate-400 group-hover:text-slate-300">
                  p. {citation.page} · {citation.snippet}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

