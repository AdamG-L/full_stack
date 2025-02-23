const blogsRouter = require('express').Router()
const { request } = require('../../../notes_example/backend/app')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    blog = new Blog(request.body)
    savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
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
