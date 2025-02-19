const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response, next) =>{
    Blog.find({})
    .then(blogs => response.json(blogs))
    .catch(err => next(err))
})

blogsRouter.post('/', (request, response, next) => {
    blog = new Blog(request.body)
    blog.save()
    .then(savedBlog => response.status(201).json(savedBlog))
    .catch(err => next(err))
})

module.exports = blogsRouter
