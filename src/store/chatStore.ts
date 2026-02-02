import { create } from 'zustand'
import type { Citation, Conversation, Message } from '../types'
import { createId } from '../utils/id'

type ViewerState = {
  isOpen: boolean
  citations: Citation[]
  selectedCitationId: string | null
}

type LastUserMessage = {
  conversationId: string
  content: string
}

type ChatState = {
  conversationsById: Record<string, Conversation>
  conversationOrder: string[]
  activeConversationId: string | null
  isLoading: boolean
  error: string | null
  lastUserMessage: LastUserMessage | null
  viewer: ViewerState
  createConversation: () => string
  setActiveConversation: (conversationId: string) => void
  addMessage: (conversationId: string, message: Message) => void
  updateConversation: (conversationId: string, updates: Partial<Conversation>) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  setLastUserMessage: (payload: LastUserMessage | null) => void
  openViewer: (citations: Citation[], selectedId: string) => void
  closeViewer: () => void
  selectCitation: (citationId: string) => void
}

const createEmptyConversation = (title = 'New chat'): Conversation => {
  const now = Date.now()
  return {
    id: createId('conv'),
    title,
    createdAt: now,
    updatedAt: now,
    messages: [],
  }
}

export const buildInitialData = () => {
  const initialConversation = createEmptyConversation()
  return {
    conversationsById: { [initialConversation.id]: initialConversation },
    conversationOrder: [initialConversation.id],
    activeConversationId: initialConversation.id,
    isLoading: false,
    error: null,
    lastUserMessage: null,
    viewer: {
      isOpen: false,
      citations: [],
      selectedCitationId: null,
    },
  }
}

export const useChatStore = create<ChatState>((set, get) => ({
  ...buildInitialData(),
  createConversation: () => {
    const conversation = createEmptyConversation()
    set((state) => ({
      conversationsById: {
        ...state.conversationsById,
        [conversation.id]: conversation,
      },
      conversationOrder: [conversation.id, ...state.conversationOrder],
      activeConversationId: conversation.id,
    }))
    return conversation.id
  },
  setActiveConversation: (conversationId) => {
    if (!get().conversationsById[conversationId]) return
    set({ activeConversationId: conversationId, error: null })
  },
  addMessage: (conversationId, message) => {
    set((state) => {
      const conversation = state.conversationsById[conversationId]
      if (!conversation) return state
      const updated: Conversation = {
        ...conversation,
        messages: [...conversation.messages, message],
        updatedAt: Date.now(),
      }
      return {
        conversationsById: { ...state.conversationsById, [conversationId]: updated },
      }
    })
  },
  updateConversation: (conversationId, updates) => {
    set((state) => {
      const conversation = state.conversationsById[conversationId]
      if (!conversation) return state
      return {
        conversationsById: {
          ...state.conversationsById,
          [conversationId]: { ...conversation, ...updates, updatedAt: Date.now() },
        },
      }
    })
  },
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setLastUserMessage: (payload) => set({ lastUserMessage: payload }),
  openViewer: (citations, selectedId) =>
    set({
      viewer: { isOpen: true, citations, selectedCitationId: selectedId },
    }),
  closeViewer: () =>
    set({
      viewer: { isOpen: false, citations: [], selectedCitationId: null },
    }),
  selectCitation: (citationId) =>
    set((state) => ({
      viewer: { ...state.viewer, selectedCitationId: citationId },
    })),
}))