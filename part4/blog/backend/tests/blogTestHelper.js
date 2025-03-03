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

const initializeUsers = async () => {
    const saltRounds = 10
    await Promise.all(initialUsers.map(async (u) => {
        const passwordHash = await bcrypt.hash(u.password, saltRounds)
        await new User({...u,
            passwordHash
        }).save()
    }))
}

const initializeBlogs = async (username) => {
    // Manually add associated user
    const user = await User.findOne({ username })
    const userId = user._id.toString()
    await Promise.all(initialBlogs.map(async (b) => {
        const blog = await new Blog({ ...b, user: userId }).save()
        // Add blogId to user
        user.blogs = user.blogs.concat(blog._id)
    }))
    await user.save()
}

module.exports = {
    initialBlogs, initialUsers, getBlogs, initializeUsers, initializeBlogs
}
