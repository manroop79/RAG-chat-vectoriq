import { buildInitialData, useChatStore } from '../store/chatStore'

export const resetChatStore = () => {
  useChatStore.setState(buildInitialData())
}

