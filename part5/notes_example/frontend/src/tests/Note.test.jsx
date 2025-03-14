import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from '../components/Note'

describe('<Togglable />', () => {

  test('Note Button triggers oncec', async () => {
    const note = {
      content: 'Component testing is done with react-testing-library',
      important: true
    }

    const mockHandler = vi.fn()

    render(<Note note={note} toggleImportance={mockHandler} />)
    const user = userEvent.setup()
    const button = screen.getByText('mark unimportant')
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
  })

  test('Note content is rendered', () => {
    const note = {
      content: 'Component testing is done with react-testing-library',
      important: true
    }

    render(<Note note={note} />)
    // Turns into a contains function
    screen.getByText('Component testing is done with react-testing-library'
      , { exact: false }
    )
    // Other option
    //const element = await screen.findByText('Does not work anymore :(')
    // Doesnt cause exception if not found
    //const element = screen.queryByText('do not want this thing to be rendered')
  })
})