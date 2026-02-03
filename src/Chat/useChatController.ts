import { useCallback } from 'react'
import type { Message } from '../types'
import { sendChatMessage } from '../services/chatService'
import { useChatStore } from '../store/chatStore'
import { buildConversationTitle } from '../utils/chat'
import { createId } from '../utils/id'

const buildUserMessage = (content: string): Message => ({
  id: createId('msg'),
  role: 'user',
  content,
  createdAt: Date.now(),
  status: 'ok',
})

const buildAssistantMessage = (
  content: string,
  status: 'ok' | 'error',
  citations?: Message['citations'],
): Message => ({
  id: createId('msg'),
  role: 'assistant',
  content,
  createdAt: Date.now(),
  citations,
  status,
})

export const useChatController = () => {
  const {
    activeConversationId,
    createConversation,
    setActiveConversation,
    addMessage,
    updateConversation,
    setLoading,
    setError,
    setLastUserMessage,
    lastUserMessage,
    isLoading,
  } = useChatStore()

  const sendMessage = useCallback(
    async (content: string, appendUserMessage = true) => {
      const trimmed = content.trim()
      if (!trimmed || isLoading) return

      const conversationId = activeConversationId ?? createConversation()
      if (appendUserMessage) {
        addMessage(conversationId, buildUserMessage(trimmed))
        const conversation = useChatStore.getState().conversationsById[conversationId]
        if (conversation && conversation.messages.length === 1) {
          updateConversation(conversationId, { title: buildConversationTitle(trimmed) })
        }
      }

      setLoading(true)
      setError(null)
      setLastUserMessage({ conversationId, content: trimmed })

      try {
        const response = await sendChatMessage(conversationId, trimmed)
        if (!response || !response.answer.trim()) {
          setError('No response received. Please try again.')
          addMessage(
            conversationId,
            buildAssistantMessage(
              'I did not receive a usable response. Please try again.',
              'error',
            ),
          )
          return
        }

        addMessage(
          conversationId,
          buildAssistantMessage(response.answer, 'ok', response.citations),
        )
      } catch (error) {
        setError('We could not reach the assistant. Please retry.')
        addMessage(
          conversationId,
          buildAssistantMessage(
            'Something went wrong while fetching the response.',
            'error',
          ),
        )
      } finally {
        setLoading(false)
      }
    },
    [
      activeConversationId,
      addMessage,
      createConversation,
      isLoading,
      setError,
      setLastUserMessage,
      setLoading,
      updateConversation,
    ],
  )

  const retryLastMessage = useCallback(async () => {
    if (!lastUserMessage || isLoading) return
    await sendMessage(lastUserMessage.content, false)
  }, [isLoading, lastUserMessage, sendMessage])

  const newChat = useCallback(() => {
    createConversation()
    setError(null)
  }, [createConversation, setError])

  const switchConversation = useCallback(
    (conversationId: string) => {
      setActiveConversation(conversationId)
    },
    [setActiveConversation],
  )

  return { sendMessage, retryLastMessage, newChat, switchConversation }
}

