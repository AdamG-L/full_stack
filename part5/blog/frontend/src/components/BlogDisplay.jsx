import Blog from './Blog'

const BlogDisplay = ({ blogs, handleLike, userId, deleteBlog }) => {
    blogs.sort((a, b) => b.likes - a.likes)
    return (
        <div>
            {blogs.map(b => (
                <Blog key={b.id} blog={b} handleLike={handleLike}
                    userId={userId} deleteBlog={deleteBlog}></Blog>
            ))}
        </div>
    )
}
export default BlogDisplay