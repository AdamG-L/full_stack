const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, b) => sum + b.likes, 0)
}

// '?.' Optional chaining to check likes during 1st iteration.
const favoriteBlog = (blogs) => {
    return blogs.reduce((max, b) =>
        (b.likes > (max?.likes || 0) ? b : max)
        , null)
}

const mostBlogs = (blogs) => {
    // Returns author with most blogs and # of blogs
    const authors = new Map()
    blogs.forEach(b => {
        authors.set(b.author, (authors.get(b.author) || 0) + 1)
    })
    let maxVal = 0
    let author = null
    authors.forEach((val, key) => {
        if (val > maxVal) { 
            maxVal = val
            author = key
         }
    })
    return {
        author: author,
        blogs: maxVal
    }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }