const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', (request, response, next) => {
    blog = new Blog(request.body)
    blog.save()
        .then(savedBlog => response.status(201).json(savedBlog))
        .catch(err => next(err))
})

module.exports = blogsRouter
