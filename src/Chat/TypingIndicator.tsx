export const TypingIndicator = () => (
  <div className="flex w-fit items-center gap-2 rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-3 text-sm text-slate-300">
    <span className="typing-dot inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
    <span
      className="typing-dot inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400"
      style={{ animationDelay: '150ms' }}
    />
    <span
      className="typing-dot inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400"
      style={{ animationDelay: '300ms' }}
    />
  </div>
)

