import Blog from './Blog'

const BlogDisplay = ({ blogs, handleLike }) => {
    blogs.sort((a,b) => b.likes - a.likes)
    return (
        <div>
            {blogs.map(b => (
                <Blog key={b.id} blog={b} handleLike={handleLike}></Blog>
            ))}
        </div>
    )
}
export default BlogDisplay