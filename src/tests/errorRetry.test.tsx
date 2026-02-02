import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { resetChatStore } from './testUtils'
import { sendChatMessage } from '../services/chatService'

vi.mock('../services/chatService', () => ({
  sendChatMessage: vi.fn(),
}))

describe('error handling', () => {
  beforeEach(() => {
    resetChatStore()
    vi.mocked(sendChatMessage).mockReset()
  })

  it('shows retry UI when the mock API fails', async () => {
    vi.mocked(sendChatMessage).mockRejectedValueOnce(new Error('boom'))
    render(<App />)

    const user = userEvent.setup()
    const input = screen.getByLabelText(/ask a question/i)
    await user.type(input, 'Trigger error')
    await user.click(screen.getByRole('button', { name: /send/i }))

    const retryButton = await screen.findByRole('button', { name: /retry/i })
    expect(retryButton).toBeTruthy()
  })
})

