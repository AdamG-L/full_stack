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
            <h2 className='text-lg text-center m-3'> <strong>Add Blog</strong></h2>
            <label className='label'>
                Title:
                <input
                    data-testid='title'
                    className='input'
                    type="text"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </label>
            <br />
            <label className='label'>
                Author:
                <input
                    data-testid='author'
                    className='input'
                    type="text"
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </label>
            <br />
            <label className='label'>
                Url:
                <input
                    data-testid='url'
                    className='input'
                    type="text"
                    value={url}
                    onChange={({ target }) => setUrl(target.value)}
                />
            </label>
            <br />
            <button className='button button-blue' type="submit">Create Blog</button>

        </form>
    )
}
export default BlogForm