import { useState } from 'react'

const Blog = ({ blog }) => {
    const [display, setDisplay] = useState(false)
    const buttonLabel = display ? 'hide' : 'view'
    return (
        <div>
            {display ?
                (
                    <div>
                        Title: {blog.title}
                        <br />
                        Author: {blog.author}
                        <br />
                        Url: {blog.url}
                        <br />
                        Likes: {blog.likes}
                    </div>
                )
                :
                (
                    <div>
                        Title: {blog.title}
                    </div>
                )
            }
            <button onClick={() => setDisplay(!display)}>
                {buttonLabel}
            </button>
        </div >
    )
}

export default Blog