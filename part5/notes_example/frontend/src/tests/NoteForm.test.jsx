import { render, screen } from '@testing-library/react'
import NoteForm from '../components/NoteForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
    const createNote = vi.fn()
    const user = userEvent.setup()

    render(<NoteForm addNote={createNote} />)
    const input = screen.getByPlaceholderText('content here...')
    /* Alternative less preferred method
      render(<NoteForm addNote={createNote} />)
      const input = screen.getByPlaceholderText('content here...')
    */
    const sendButton = screen.getByText('Save')

    await user.type(input, 'testing a form...')
    await user.click(sendButton)

    expect(createNote.mock.calls).toHaveLength(1)
    expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})