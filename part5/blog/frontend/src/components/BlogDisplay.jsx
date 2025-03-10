import Blog from './Blog'

const BlogDisplay = ({ blogs }) => {
    return (
        <div>
            {blogs.map(b => (
                <Blog key={b.id} blog={b}></Blog>
            ))}
        </div>
    )
}
export default BlogDisplay