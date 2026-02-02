import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { resetChatStore } from './testUtils'
import { sendChatMessage } from '../services/chatService'

vi.mock('../services/chatService', () => ({
  sendChatMessage: vi.fn(),
}))

describe('citation viewer', () => {
  beforeEach(() => {
    resetChatStore()
    vi.mocked(sendChatMessage).mockReset()
  })

  it('opens the viewer and highlights the snippet when a citation is clicked', async () => {
    const snippet = 'MFA is required for all privileged accounts.'
    vi.mocked(sendChatMessage).mockResolvedValueOnce({
      answer: 'MFA is required for all privileged accounts.',
      citations: [
        {
          id: 'cite-1',
          documentId: 'sec-policy',
          title: 'Security Policy Handbook',
          page: 2,
          snippet,
        },
      ],
    })

    render(<App />)

    const user = userEvent.setup()
    const input = screen.getByLabelText(/ask a question/i)
    await user.type(input, 'Tell me about MFA')
    await user.click(screen.getByRole('button', { name: /send/i }))

    const citationChip = await screen.findByRole('button', {
      name: /Security Policy Handbook — p\. 2/i,
    })
    await user.click(citationChip)

    expect(await screen.findByText(snippet)).toBeTruthy()
  })
})

