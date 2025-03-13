const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { jwtMiddleware } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
        .populate('user', { username: 1, name: 1 })
    response.status(200).json(blogs)
})

blogsRouter.post('/', jwtMiddleware, async (request, response) => {
    // Get user.id from token
    const user = await User.findById(request.user.id)
    const blog = new Blog({
        ...request.body,
        user: user._id
    })
    savedBlog = await blog.save()
    // Update associated users blog array
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', jwtMiddleware, async (request, response) => {
    const blogId = request.params.id
    const userId = request.user.id
    const blog = await Blog.findById(blogId)
    const user = await User.findById(userId)
    if (!blog || !user) {
        return response.status(204).end()
    }
    if (blog.user.toString() !== userId) {
        return response.status(403).json({
            error: 'You can only delete blogs you own'
        })
    }
    user.blogs = user.blogs.filter(b => b.toString() !== blogId)
    await user.save()
    await blog.deleteOne()
    response.status(204).end()
})

blogsRouter.put('/:id', jwtMiddleware, async (request, response) => {
    const updatedBlog =
        await Blog.findByIdAndUpdate(request.params.id,
            { $set: request.body }, {
            new: true, runValidators: true,
            context: 'query'
        }
        )
    response.status(200).json(updatedBlog)
})

module.exports = blogsRouter
