import { useState } from 'react'

const Blog = ({ blog }) => {
    const [display, setDisplay] = useState(false)
    const buttonLabel = display ? 'hide' : 'view'

    return (
        <div className="p-4 border rounded shadow mb-4">
            {display ? (
                <div>
                    <p><strong>Title:</strong> {blog.title}</p>
                    <p><strong>Author:</strong> {blog.author}</p>
                    <p><strong>Url:</strong> <a href={blog.url} className="text-blue-500">{blog.url}</a></p>
                    <p><strong>Likes:</strong> {blog.likes}</p>
                </div>
            ) : (
                <p><strong>Title:</strong> {blog.title}</p>
            )}
            <button 
                onClick={() => setDisplay(!display)} 
                className="button button-blue"
            >
                {buttonLabel}
            </button>
        </div>
    )
}

export default Blog
