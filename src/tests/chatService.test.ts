import { describe, expect, it } from 'vitest'
import { sendChatMessage } from '../services/chatService'

describe('chatService retrieval', () => {
  it('returns citations for matching queries', async () => {
    const response = await sendChatMessage('conv-1', 'What are the MFA requirements?', {
      latencyMs: { min: 0, max: 0 },
      failureRate: 0,
      nullRate: 0,
      emptyRate: 0,
      noResultRate: 0,
      randomFn: () => 0.9,
    })

    expect(response).not.toBeNull()
    expect(response?.citations.length).toBeGreaterThan(0)
    expect(response?.citations[0].title).toContain('Security Policy')
  })

  it('returns empty citations for no-results queries', async () => {
    const response = await sendChatMessage('conv-2', 'quasar flux capacitor', {
      latencyMs: { min: 0, max: 0 },
      failureRate: 0,
      nullRate: 0,
      emptyRate: 0,
      noResultRate: 0,
      randomFn: () => 0.9,
    })

    expect(response?.citations.length).toBe(0)
    expect(response?.answer).toBe('No relevant documents found for your query.')
  })
})

