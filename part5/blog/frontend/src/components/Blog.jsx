import { useState } from 'react'

const Blog = ({ blog, handleLike, userId, deleteBlog }) => {
    const [display, setDisplay] = useState(false)
    const buttonLabel = display ? 'hide' : 'view'
    return (
        <div className="p-4 border rounded shadow mb-4">
            {display ? (
                <div>
                    <p><strong>Title:</strong> {blog.title}</p>
                    <p><strong>Author:</strong> {blog.author}</p>
                    <p><strong>Url:</strong> <a href={blog.url} className="text-blue-500">{blog.url}</a></p>
                    <div className='flex items-center gap-4'>
                        <p><strong>Likes:</strong> {blog.likes}</p>
                        <button className='button' onClick={() => handleLike(blog)}>Like</button>
                    </div>
                </div>
            ) : (
                <p><strong>Title:</strong> {blog.title}</p>
            )}
            <div className='flex justify-between'>
                <button
                    onClick={() => setDisplay(!display)}
                    className="button button-blue"
                >
                    {buttonLabel}
                </button>
                {userId === blog.user.id ? (
                    <button className='button' onClick={() => deleteBlog(blog)}>Delete</button>
                ) : null }

            </div>
        </div>
    )
}

export default Blog
