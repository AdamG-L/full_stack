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

module.exports = { dummy, totalLikes, favoriteBlog}