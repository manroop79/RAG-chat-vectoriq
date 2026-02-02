const STOP_WORDS = new Set([
  'the',
  'a',
  'an',
  'and',
  'or',
  'but',
  'for',
  'to',
  'of',
  'in',
  'on',
  'with',
  'by',
  'is',
  'are',
  'was',
  'were',
  'be',
  'as',
  'at',
  'from',
  'this',
  'that',
  'it',
  'its',
  'we',
  'our',
  'you',
  'your',
])

export const tokenize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token))

export const splitSentences = (content: string) =>
  content.split(/(?<=[.!?])\s+/g).filter(Boolean)

export const countTokenMatches = (text: string, tokens: string[]) => {
  if (!tokens.length) return 0
  const lower = text.toLowerCase()
  return tokens.reduce((acc, token) => (lower.includes(token) ? acc + 1 : acc), 0)
}

export const selectBestSnippet = (content: string, tokens: string[]) => {
  const sentences = splitSentences(content)
  if (!sentences.length) {
    return content.slice(0, 160)
  }

  let best = sentences[0]
  let bestScore = countTokenMatches(best, tokens)

  for (const sentence of sentences) {
    const score = countTokenMatches(sentence, tokens)
    if (score > bestScore) {
      best = sentence
      bestScore = score
    }
  }

  const snippet = best.trim()
  return snippet.length > 220 ? `${snippet.slice(0, 217)}...` : snippet
}

