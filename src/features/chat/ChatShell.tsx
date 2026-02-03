import { AnimatePresence, motion } from 'framer-motion'
import { useMemo } from 'react'
import { ChatPanel } from '../../Chat/ChatPanel'
import { ConversationSidebar } from '../../components/ConversationSidebar'
import { useChatController } from '../../Chat/useChatController'
import { useDocumentViewerController } from '../../Viewer/useDocumentViewerController'
import { useChatStore } from '../../store/chatStore'

type ChatShellProps = {
  isSidebarOpen: boolean
  onOpenSidebar: () => void
  onCloseSidebar: () => void
}

export const ChatShell = ({ isSidebarOpen, onCloseSidebar }: ChatShellProps) => {
  const { sendMessage, retryLastMessage, newChat, switchConversation } = useChatController()
  const { openViewer } = useDocumentViewerController()
  const { conversationOrder, conversationsById, activeConversationId, isLoading, error } =
    useChatStore()

  const activeConversation =
    (activeConversationId && conversationsById[activeConversationId]) || null

  const conversations = useMemo(
    () => conversationOrder.map((id) => conversationsById[id]).filter(Boolean),
    [conversationOrder, conversationsById],
  )

  return (
    <div className="flex h-full flex-1 min-h-0 flex-col lg:flex-row">
      <AnimatePresence>
        {isSidebarOpen ? (
          <div className="lg:hidden">
            <div className="fixed inset-0 z-30">
              <motion.div
                className="absolute inset-y-0 right-0 w-[25vw] bg-slate-950/95"
                role="button"
                tabIndex={-1}
                aria-label="Close conversation drawer"
                onClick={onCloseSidebar}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') onCloseSidebar()
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut', delay: 0.08 }}
              />
              <motion.div
                className="absolute inset-y-0 left-0 w-[75vw] border-r border-slate-800/70 bg-slate-950/98 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', stiffness: 210, damping: 30 }}
              >
                <ConversationSidebar
                  conversations={conversations}
                  activeConversationId={activeConversationId}
                  onSelect={(conversationId) => {
                    switchConversation(conversationId)
                    onCloseSidebar()
                  }}
                  onNewChat={() => {
                    newChat()
                    onCloseSidebar()
                  }}
                  variant="sidebar"
                  className="h-full w-full bg-transparent"
                />
              </motion.div>
            </div>
          </div>
        ) : null}
      </AnimatePresence>
      <div className="hidden h-full lg:block">
        <ConversationSidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelect={switchConversation}
          onNewChat={newChat}
          variant="sidebar"
        />
      </div>
      <ChatPanel
        messages={activeConversation?.messages ?? []}
        isLoading={isLoading}
        error={error}
        onSendMessage={sendMessage}
        onRetry={retryLastMessage}
        onCitationClick={openViewer}
      />
    </div>
  )
}

