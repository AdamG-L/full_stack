import { useState } from 'react'

const BlogForm = ({ submitBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const createBlog = (event) => {
        event.preventDefault()
        submitBlog({
            title,
            author,
            url
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }
    return (
        <form onSubmit={createBlog}>
            <h2> Add Blog</h2>
            Title:
            <input
                type="text"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
            />
            <br />
            Author:
            <input
                type="text"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
            />
            <br />
            Url:
            <input
                type="text"
                value={url}
                onChange={({ target }) => setUrl(target.value)}
            />
            <br />
            <button type="submit">Create Blog</button>

        </form>
    )
}
export default BlogForm