const BlogForm = ({title, author, url, setTitle,
    setAuthor, setUrl, submitBlog}) => (
    <form onSubmit={submitBlog}>
        <h2> Add Blog</h2>
        Title: 
        <input
        type="text"
        value={title} 
        onChange={({target}) => setTitle(target.value)}
        />
        <br/>
        Author:
        <input
        type="text"
        value={author} 
        onChange={({target}) => setAuthor(target.value)}
        />
        <br/>
        Url:
        <input
        type="text"
        value={url} 
        onChange={({target}) => setUrl(target.value)}
        />
        <br/>
        <button type="submit">Create Blog</button>

    </form>
)

export default BlogForm