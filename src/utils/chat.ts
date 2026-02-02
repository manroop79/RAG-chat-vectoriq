export const buildConversationTitle = (message: string) => {
  const trimmed = message.trim()
  if (!trimmed) return 'New chat'
  return trimmed.length > 40 ? `${trimmed.slice(0, 37)}...` : trimmed
}

