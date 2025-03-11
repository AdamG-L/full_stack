import Blog from './Blog'

const BlogDisplay = ({ blogs, handleLike }) => {
    return (
        <div>
            {blogs.map(b => (
                <Blog key={b.id} blog={b} handleLike={handleLike}></Blog>
            ))}
        </div>
    )
}
export default BlogDisplay