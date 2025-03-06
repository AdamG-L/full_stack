const BlogDisplay = ({ blogs }) => (
    <div>
        {blogs.map(b => (
            <div key={b.id}>
                <h4>{b.title}</h4>
                <p>Url: {b.url} <br/>
                Likes: {b.likes}</p>
            </div>
        ))}
    </div>
)

export default BlogDisplay