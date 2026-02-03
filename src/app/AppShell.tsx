import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { AppHeader } from '../components/AppHeader'
import { ChatShell } from '../features/chat/ChatShell'
import { DocumentViewer } from '../Viewer/DocumentViewer'
import { useDocumentViewerController } from '../Viewer/useDocumentViewerController'
import { useChatStore } from '../store/chatStore'

export const AppShell = () => {
  const { viewer } = useChatStore()
  const { closeViewer, selectCitation } = useDocumentViewerController()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-full min-h-[100svh] flex-col overflow-hidden bg-slate-950 text-slate-100">
      <AppHeader onMenuClick={() => setIsSidebarOpen(true)} />
      <div className="flex min-h-0 flex-1 overflow-hidden px-4 lg:px-8">
        {viewer.isOpen ? (
          <div
            className="fixed inset-0 z-10 hidden bg-slate-950/85 lg:block"
            role="button"
            tabIndex={-1}
            aria-label="Close document viewer"
            onClick={closeViewer}
            onKeyDown={(event) => {
              if (event.key === 'Escape') closeViewer()
            }}
          />
        ) : null}
        <div className="mx-auto flex min-h-0 w-full max-w-none overflow-hidden rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/80 via-slate-950/40 to-slate-900/40 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
          <ChatShell
            isSidebarOpen={isSidebarOpen}
            onOpenSidebar={() => setIsSidebarOpen(true)}
            onCloseSidebar={() => setIsSidebarOpen(false)}
          />
          <div className="hidden h-full lg:block">
            <DocumentViewer
              isOpen={viewer.isOpen}
              citations={viewer.citations}
              selectedCitationId={viewer.selectedCitationId}
              onClose={closeViewer}
              onSelectCitation={selectCitation}
            />
          </div>
        </div>
      </div>
      <div className="lg:hidden">
        <AnimatePresence>
          {viewer.isOpen ? (
            <motion.div
              className="fixed inset-y-0 left-0 z-10 w-[25vw] bg-slate-950/95"
              role="button"
              tabIndex={-1}
              aria-label="Close document viewer"
              onClick={closeViewer}
              onKeyDown={(event) => {
                if (event.key === 'Escape') closeViewer()
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut', delay: 0.08 }}
            />
          ) : null}
        </AnimatePresence>
        <DocumentViewer
          isOpen={viewer.isOpen}
          citations={viewer.citations}
          selectedCitationId={viewer.selectedCitationId}
          onClose={closeViewer}
          onSelectCitation={selectCitation}
        />
      </div>
    </div>
  )
}

