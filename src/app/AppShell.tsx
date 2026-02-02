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
    <div className="flex h-screen flex-col bg-slate-950 text-slate-100">
      <AppHeader onMenuClick={() => setIsSidebarOpen(true)} />
      <div className="flex flex-1 overflow-hidden px-4 pb-6 pt-4 lg:px-8">
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
        <div className="mx-auto flex h-full w-full max-w-[1440px] overflow-hidden rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/80 via-slate-950/40 to-slate-900/40 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
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
      {viewer.isOpen ? (
        <div className="lg:hidden">
          <div
            className="fixed inset-y-0 left-0 z-10 w-[25vw] bg-slate-950/95"
            role="button"
            tabIndex={-1}
            aria-label="Close document viewer"
            onClick={closeViewer}
            onKeyDown={(event) => {
              if (event.key === 'Escape') closeViewer()
            }}
          />
          <DocumentViewer
            isOpen={viewer.isOpen}
            citations={viewer.citations}
            selectedCitationId={viewer.selectedCitationId}
            onClose={closeViewer}
            onSelectCitation={selectCitation}
          />
        </div>
      ) : null}
    </div>
  )
}

