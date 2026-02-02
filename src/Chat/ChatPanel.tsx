import { useEffect, useRef, useState } from 'react'
import type { Citation, Message } from '../types'
import { MessageList } from './MessageList'
import { ChatInput } from './ChatInput'
import { Button } from '../Common/Button'

type ChatPanelProps = {
  messages: Message[]
  isLoading: boolean
  error: string | null
  onSendMessage: (message: string) => void
  onRetry: () => void
  onCitationClick: (citation: Citation, citations: Citation[]) => void
}

export const ChatPanel = ({
  messages,
  isLoading,
  error,
  onSendMessage,
  onRetry,
  onCitationClick,
}: ChatPanelProps) => {
  const [draft, setDraft] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const isEmpty = messages.length === 0 && !isLoading
  const isSendDisabled = isLoading || draft.trim().length === 0
  const suggestions = [
    'What are the MFA requirements for privileged accounts?',
    'Summarize the incident response containment steps.',
    'What is the PTO accrual policy for full-time employees?',
    'Which tools are required during employee onboarding?',
  ]

  const handleSend = () => {
    const trimmed = draft.trim()
    if (!trimmed) return
    onSendMessage(trimmed)
    setDraft('')
    inputRef.current?.focus()
  }

  useEffect(() => {
    if (!isLoading) {
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [isLoading])

  return (
    <section className="flex h-full min-h-0 flex-1 flex-col border-t border-slate-800/70 bg-transparent lg:border-t-0">
      {isEmpty ? (
        <div className="bg-slate-950/40 px-6 py-8">
          <div className="max-w-2xl rounded-2xl border border-slate-800/70 bg-slate-950/60 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
            <div className="flex items-start justify-between gap-6">
              <div className="space-y-2">
                <p className="text-base font-semibold text-slate-100">
                  Ask me about internal documents
                </p>
                <p className="text-sm text-slate-400">
                  I’ll answer using internal documentation and show you citations.
                </p>
              </div>
              <span className="rounded-full border border-amber-300/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-200">
                RAG Assistant
              </span>
            </div>
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                You can ask questions like:
              </p>
              <ul className="mt-3 space-y-1 text-sm text-slate-300">
                <li>“What is the password rotation policy?”</li>
                <li>“How do we handle security incidents?”</li>
                <li>“What is the PTO policy?”</li>
              </ul>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {suggestions.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => {
                    setDraft(prompt)
                    inputRef.current?.focus()
                  }}
                  className="cursor-pointer rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1 text-xs text-slate-300 transition hover:border-cyan-400/60 hover:bg-cyan-500/10 hover:text-cyan-100"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
      <MessageList messages={messages} isLoading={isLoading} onCitationClick={onCitationClick} />
      {error ? (
        <div className="border-t border-red-500/40 bg-red-500/10 px-6 py-3 text-sm text-red-200">
          <div className="flex items-center justify-between gap-4">
            <span>{error}</span>
            <Button variant="secondary" onClick={onRetry} disabled={isLoading}>
              Retry
            </Button>
          </div>
        </div>
      ) : null}
      <ChatInput
        value={draft}
        onChange={setDraft}
        onSend={handleSend}
        disabled={isLoading}
        isLoading={isLoading}
        isSendDisabled={isSendDisabled}
        inputRef={inputRef}
      />
    </section>
  )
}

