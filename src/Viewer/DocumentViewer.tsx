import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useId } from 'react'
import type { Citation } from '../types'
import { getDocumentById } from '../documents/corpus'
import { Button } from '../Common/Button'

type DocumentViewerProps = {
  isOpen: boolean
  citations: Citation[]
  selectedCitationId: string | null
  onClose: () => void
  onSelectCitation: (citationId: string) => void
}

const HighlightedContent = ({ content, snippet }: { content: string; snippet: string }) => {
  if (!snippet || !content.includes(snippet)) {
    return <p className="whitespace-pre-wrap text-sm text-slate-200">{content}</p>
  }

  const parts = content.split(snippet)
  return (
    <p className="whitespace-pre-wrap text-sm text-slate-200">
      {parts[0]}
      <mark className="rounded bg-amber-300/80 px-1 text-slate-900">{snippet}</mark>
      {parts.slice(1).join(snippet)}
    </p>
  )
}

export const DocumentViewer = ({
  isOpen,
  citations,
  selectedCitationId,
  onClose,
  onSelectCitation,
}: DocumentViewerProps) => {
  const titleId = useId()
  const descriptionId = useId()
  const prefersReducedMotion = useReducedMotion()
  const selectedCitation =
    citations.find((citation) => citation.id === selectedCitationId) ?? citations[0]

  const docRecord = selectedCitation ? getDocumentById(selectedCitation.documentId) : null
  const pageContent =
    docRecord?.pages.find((page) => page.page === selectedCitation?.page)?.content ?? ''

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <motion.div
      className="fixed bottom-0 right-0 top-0 z-20 flex w-[75vw] flex-col border-l border-slate-800/70 bg-slate-950 shadow-2xl lg:w-[32rem]"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      aria-hidden={!isOpen}
      style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      initial={false}
      animate={{ x: isOpen ? 0 : 420, opacity: isOpen ? 1 : 0 }}
      transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 220, damping: 28 }}
    >
      <div className="flex items-center justify-between border-b border-slate-800/70 px-5 py-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Document Viewer
          </p>
          <h2 id={titleId} className="text-base font-semibold text-slate-100">
            {docRecord?.title ?? 'Select a citation'}
          </h2>
        </div>
        <Button
          variant="ghost"
          onClick={onClose}
          className="rounded-full border border-slate-800/70 px-4 py-2 text-xs uppercase tracking-wide hover:border-cyan-400/60"
        >
          Close
        </Button>
      </div>
      <div className="border-b border-slate-800/70 px-5 py-3">
        <p className="text-xs font-semibold uppercase text-slate-500">Citations</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {citations.map((citation, index) => (
            <button
              key={citation.id}
              type="button"
              onClick={() => onSelectCitation(citation.id)}
              className={`flex max-w-[14rem] flex-col gap-1 rounded-xl px-3 py-2 text-left text-xs font-semibold transition hover:cursor-pointer ${
                citation.id === selectedCitation?.id
                  ? 'bg-cyan-500/20 text-white ring-1 ring-cyan-400/60'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold">{index + 1}. {citation.title}</span>
                <span className="whitespace-nowrap rounded-full bg-slate-900 px-2 py-0.5 text-[10px] text-slate-300">
                  C{index + 1}
                </span>
              </div>
              <span className="line-clamp-2 text-[11px] font-normal text-slate-400">
                p. {citation.page} · {citation.snippet}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-5">
        {selectedCitation ? (
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Section</p>
              <p className="mt-2 text-sm font-semibold text-slate-100">
                Page {selectedCitation.page}
              </p>
            </div>
            <div
              id={descriptionId}
              className="rounded-2xl border border-slate-800/70 bg-slate-950/70 p-4 shadow-[0_12px_24px_rgba(0,0,0,0.35)]"
            >
              <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase text-slate-500">
                <span>Excerpt</span>
                <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] text-amber-200">
                  Highlighted
                </span>
              </div>
              <HighlightedContent content={pageContent} snippet={selectedCitation.snippet} />
            </div>
          </div>
        ) : (
          <p id={descriptionId} className="text-sm text-slate-400">
            Select a citation from an assistant response to view the document context.
          </p>
        )}
      </div>
    </motion.div>
  )
}

