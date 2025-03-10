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
            </label>
            <input
                className='input'
                type="text"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
            />
            <br />
            <label className='label'>
                Author:
            </label>
            <input
                className='input'
                type="text"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
            />
            <br />
            <label className='label'>
                Url:
            </label>
            <input
                className='input'
                type="text"
                value={url}
                onChange={({ target }) => setUrl(target.value)}
            />
            <br />
            <button className='button button-blue' type="submit">Create Blog</button>

        </form>
    )
}
export default BlogForm