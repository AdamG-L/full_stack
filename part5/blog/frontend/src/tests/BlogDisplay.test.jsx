import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

describe('<Blog/>', () => {
    let container
    let mockLike

    beforeEach(() => {
        const blog = {
            title: "Kuro's Post",
            author: "Kuro",
            url: "https://www.kuro.com",
            likes: 101,
            user: {
                id: "1"
            }
        }
        mockLike = vi.fn()
        const userId = "1"
        const mockDeleteBlog = vi.fn()

        container = render(
            <Blog blog={blog} handleLike={mockLike}
                userId={userId} deleteBlog={mockDeleteBlog} />

        ).container
    })

    test('Only title displayed by default', async () => {
        screen.debug()
        expect(screen.queryByText("Url:", { exact: false }))
            .not.toBeInTheDocument()
        expect(screen.queryByText("Author:", { exact: false }))
            .not.toBeInTheDocument()
        expect(screen.queryByText("Likes:", { exact: false }))
            .not.toBeInTheDocument()
        expect(screen.queryByText("Title:"), { exact: false })
            .toBeInTheDocument()
    })

    test('All details displayed when button clicked', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        expect(screen.queryByText("Url:", { exact: false }))
            .toBeInTheDocument()
        expect(screen.queryByText("Author:", { exact: false }))
            .toBeInTheDocument()
        expect(screen.queryByText("Likes:", { exact: false }))
            .toBeInTheDocument()
        expect(screen.queryByText("Title:"), { exact: false })
            .toBeInTheDocument()
    })

    test('Like button clicked 2 times triggers 2 func calls', async () => {
        const user = userEvent.setup()
        const viewButton = screen.getByText('view')
        await user.click(viewButton)
        const likeButton = screen.getByText('Like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(mockLike.mock.calls).toHaveLength(2)
    })

})