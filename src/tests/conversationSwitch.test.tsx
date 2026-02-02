import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { resetChatStore } from './testUtils'
import { sendChatMessage } from '../services/chatService'

vi.mock('../services/chatService', () => ({
  sendChatMessage: vi.fn(),
}))

describe('conversation switching', () => {
  beforeEach(() => {
    resetChatStore()
    vi.mocked(sendChatMessage).mockReset()
    vi.mocked(sendChatMessage).mockResolvedValue({
      answer: 'ok',
      citations: [],
    })
  })

  it('switches between conversations from the history list', async () => {
    render(<App />)

    const user = userEvent.setup()
    const input = screen.getByLabelText(/ask a question/i)
    await user.type(input, 'First conversation')
    await user.click(screen.getByRole('button', { name: /send/i }))
    await screen.findByText('ok')

    const sidebar = screen.getByTestId('conversation-compact')
    await user.click(within(sidebar).getByRole('button', { name: /new chat/i }))

    await user.type(input, 'Second conversation')
    await user.click(screen.getByRole('button', { name: /send/i }))
    await screen.findAllByText('ok')

    const firstConversationButton = within(sidebar).getByRole('button', {
      name: /First conversation/i,
    })
    await user.click(firstConversationButton)

    const messageList = screen.getByTestId('message-list')
    expect(within(messageList).getByText(/First conversation/i)).toBeTruthy()
  })
})

