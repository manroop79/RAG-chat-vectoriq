import type { ChatResponse, Citation } from '../types'
import { documents } from '../documents/corpus'
import { createId } from '../utils/id'
import { countTokenMatches, selectBestSnippet, tokenize } from '../utils/text'

export type SimulationConfig = {
  latencyMs: { min: number; max: number }
  failureRate: number
  nullRate: number
  emptyRate: number
  noResultRate: number
  maxCitations: number
  randomFn?: () => number
}

const DEFAULT_CONFIG: SimulationConfig = {
  latencyMs: { min: 1000, max: 2000 },
  failureRate: 0.12,
  nullRate: 0.05,
  emptyRate: 0.05,
  noResultRate: 0.08,
  maxCitations: 3,
}

type PageMatch = {
  documentId: string
  title: string
  page: number | string
  content: string
  score: number
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const resolveRandom = (config: SimulationConfig) => config.randomFn?.() ?? Math.random()

const pickLatency = (config: SimulationConfig) => {
  const range = config.latencyMs.max - config.latencyMs.min
  return config.latencyMs.min + Math.floor(resolveRandom(config) * range)
}

const buildMatches = (tokens: string[]): PageMatch[] => {
  const matches: PageMatch[] = []

  documents.forEach((doc) => {
    doc.pages.forEach((page) => {
      const score = countTokenMatches(page.content, tokens)
      if (score > 0) {
        matches.push({
          documentId: doc.id,
          title: doc.title,
          page: page.page,
          content: page.content,
          score,
        })
      }
    })
  })

  return matches.sort((a, b) => b.score - a.score)
}

const buildCitations = (matches: PageMatch[], tokens: string[], maxCitations: number) =>
  matches.slice(0, maxCitations).map<Citation>((match) => ({
    id: createId('cite'),
    documentId: match.documentId,
    title: match.title,
    page: match.page,
    snippet: selectBestSnippet(match.content, tokens),
  }))

const generateAnswer = (citations: Citation[]) => {
  const titles = [...new Set(citations.map((citation) => citation.title))]
  const intro =
    titles.length > 1
      ? `Based on ${titles.join(', ')}, here is a consolidated summary:`
      : `From ${titles[0]}, here is what I found:`
  return `${intro} ${citations
    .map((citation) => citation.snippet.replace(/\.\.\.$/, ''))
    .join(' ')}`
}

export const sendChatMessage = async (
  conversationId: string,
  userMessage: string,
  configOverrides?: Partial<SimulationConfig>,
): Promise<ChatResponse | null> => {
  const config: SimulationConfig = { ...DEFAULT_CONFIG, ...configOverrides }
  await delay(pickLatency(config))

  const random = resolveRandom(config)
  if (random < config.failureRate) {
    throw new Error(`Mock API failure for conversation ${conversationId}`)
  }
  if (random < config.failureRate + config.nullRate) {
    return null
  }
  if (random < config.failureRate + config.nullRate + config.emptyRate) {
    return { answer: '', citations: [] }
  }
  if (random < config.failureRate + config.nullRate + config.emptyRate + config.noResultRate) {
    return { answer: 'No relevant documents found for your query.', citations: [] }
  }

  const tokens = tokenize(userMessage)
  const matches = buildMatches(tokens)
  if (!matches.length) {
    return { answer: 'No relevant documents found for your query.', citations: [] }
  }

  const citations = buildCitations(matches, tokens, config.maxCitations)
  return { answer: generateAnswer(citations), citations }
}