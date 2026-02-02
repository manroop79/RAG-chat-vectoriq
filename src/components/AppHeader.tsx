type AppHeaderProps = {
  onMenuClick?: () => void
}

export const AppHeader = ({ onMenuClick }: AppHeaderProps) => (
  <header className="border-b border-slate-800/70 bg-slate-950/90 px-6 py-4">
    <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800/70 bg-slate-950/70 text-slate-200 transition hover:border-cyan-400/60 hover:bg-slate-900 lg:hidden"
          aria-label="Open conversation drawer"
        >
          <span className="flex flex-col gap-1">
            <span className="h-0.5 w-5 rounded-full bg-slate-200" />
            <span className="h-0.5 w-5 rounded-full bg-slate-200" />
            <span className="h-0.5 w-5 rounded-full bg-slate-200" />
          </span>
        </button>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-300/70">
            Enterprise RAG
          </p>
          <h1 className="text-lg font-semibold text-slate-100">Enterprise-Grade RAG Chatbot</h1>
        </div>
      </div>
      <div className="hidden text-xs text-slate-400 lg:block">Mocked AI</div>
    </div>
  </header>
)

