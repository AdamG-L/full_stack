import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../components/BlogForm'

describe('<Blog/>', () => {

    test('Blog Submit contains proper info', async () => {
        const mockSubmit = vi.fn()
        const user = userEvent.setup()
        render(<BlogForm submitBlog={mockSubmit}/>)
        const titleInput = screen.getByLabelText(/title/i)
        const authorInput = screen.getByLabelText(/author/i)
        const urlInput = screen.getByLabelText(/url/i)

        await user.type(titleInput, "Kuro's Blog")
        await user.type(authorInput, "Kuro")
        await user.type(urlInput, "https://www.kuro.com")

        const submitButton = screen.getByText("Create Blog")
        await user.click(submitButton)

        expect(mockSubmit).toHaveBeenCalledTimes(1)
        expect(mockSubmit).toHaveBeenCalledWith({
            title: "Kuro's Blog",
            author: "Kuro",
            url: "https://www.kuro.com"
        })
    })
})