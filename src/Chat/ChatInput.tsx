import type { RefObject } from 'react'
import { Button } from '../Common/Button'

type ChatInputProps = {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  disabled?: boolean
  isLoading?: boolean
  isSendDisabled?: boolean
  inputRef?: RefObject<HTMLTextAreaElement | null>
}

export const ChatInput = ({
  value,
  onChange,
  onSend,
  disabled,
  isLoading,
  isSendDisabled,
  inputRef,
}: ChatInputProps) => (
  <div className="bg-slate-950/60 px-6 py-4">
    <div className="mb-2 flex items-center gap-2 text-xs text-slate-400">
      <span
        className={`inline-flex h-2 w-2 rounded-full ${
          isLoading ? 'animate-pulse bg-cyan-400' : 'bg-slate-600'
        }`}
      />
      <span>{isLoading ? 'Assistant is thinking…' : 'Ready for your question'}</span>
    </div>
    <div className="flex items-end gap-3">
      <label htmlFor="chat-input" className="sr-only">
        Ask a question
      </label>
      <textarea
        id="chat-input"
        ref={inputRef}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            if (!disabled && !isSendDisabled) onSend()
          }
        }}
        rows={2}
        placeholder='Try: "What are the MFA requirements?"'
        className="flex-1 resize-none rounded-xl border border-slate-800/70 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 shadow-[0_12px_24px_rgba(0,0,0,0.35)] placeholder:text-slate-500 focus:border-cyan-400/70 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 disabled:text-slate-500"
      />
      <Button variant="primary" onClick={onSend} disabled={isSendDisabled || disabled}>
        {isLoading ? 'Sending…' : 'Send'}
      </Button>
    </div>
  </div>
)

