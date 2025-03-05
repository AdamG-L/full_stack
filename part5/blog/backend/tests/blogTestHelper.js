const Blog = require('../models/blog')
const User = require('../models/user')

const initialUsers = [
    {
        username: "SillyKuro",
        name: "Kuro",
        password: "password"
    },
    {
        username: "SillyMiyu",
        name: "Miyu",
        password: "password"
    }
]

const initialBlogs = [
    {
        title: "Kuro's First Blog",
        author: "Kuro",
        url: "https://kuroiscool.com/",
        likes: 7,
    },
    {
        title: "Kuro's Second Blog",
        author: "Kuro",
        url: "http://www.kuroooo.com",
        likes: 5,
    }
]
const getBlogs = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
}

module.exports = {
    initialBlogs, initialUsers, getBlogs
}
