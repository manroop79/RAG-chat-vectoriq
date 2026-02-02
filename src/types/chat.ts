export type Citation = {
  id: string
  documentId: string
  title: string
  page: number | string
  snippet: string
}

export type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: number
  citations?: Citation[]
  status?: 'ok' | 'error'
}

export type Conversation = {
  id: string
  title: string
  createdAt: number
  updatedAt: number
  messages: Message[]
}

export type ChatResponse = {
  answer: string
  citations: Citation[]
}

