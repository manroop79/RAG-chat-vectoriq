import { useCallback } from 'react'
import type { Citation } from '../types'
import { useChatStore } from '../store/chatStore'

export const useDocumentViewerController = () => {
  const { openViewer, closeViewer, selectCitation } = useChatStore()

  const open = useCallback(
    (citation: Citation, citationsForMessage: Citation[]) => {
      openViewer(citationsForMessage, citation.id)
    },
    [openViewer],
  )

  const close = useCallback(() => {
    closeViewer()
  }, [closeViewer])

  const select = useCallback(
    (citationId: string) => {
      selectCitation(citationId)
    },
    [selectCitation],
  )

  return { openViewer: open, closeViewer: close, selectCitation: select }
}

