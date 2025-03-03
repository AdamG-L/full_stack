const { test, after, describe, beforeEach } = require('node:test')
const { initialBlogs, initialUsers, initializeUsers, initializeBlogs, getBlogs } = require('./blogTestHelper')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')
const app = require('../app')
const api = supertest(app)

describe('Blog API Tests:', () => {
    let token = null
    beforeEach(async () => {
        await Blog.deleteMany({})
        await User.deleteMany({})
        // Create User
        await api.post('/api/users')
            .send({
                username: initialUsers[0].username,
                name: initialUsers[0].name,
                password: initialUsers[0].password
            })
        // Login w/ new user
        const loginRes = await api.post('/api/login')
            .send({
                username: initialUsers[0].username,
                password: initialUsers[0].password
            })
        // Add a blog directly to DB
        const user = await User.findOne({ username: initialUsers[0].username })
        const savedBlog = await new Blog({
            ...initialBlogs[0],
            user: user._id
        }).save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        token = loginRes.body.token
    })

    after(async () => {
        await mongoose.connection.close()
    })

    test('Working post request', async () => {
        const newBlog = {
            ...initialBlogs[1]
        }
        await api.post('/api/blogs')
            .set("Authorization", `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const blogs = await getBlogs()
        assert.strictEqual(blogs.length, 2)
        const urls = blogs.map(b => b.url)
        assert(urls.includes("http://www.kuroooo.com"))
    })

    test('Get request returns 1 blog', async () => {
        const response = await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        assert.strictEqual(response.body.length, 1)
    })

    test('backend return modifies _id to id', async () => {
        const response = await api.get('/api/blogs')
        const blog = response.body[0]
        assert.strictEqual('id' in blog, true)
        assert.strictEqual('_id' in blog, false)
    })

    test('if (like) value missing, default will be 0', async () => {
        const newBlog = {
            title: "Kuro's Third Blog",
            author: "Kuro",
            url: "http://www.kurokuro.com"
        }
        await api.post('/api/blogs')
            .set("Authorization", `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const blogs = await getBlogs()
        const blogLikes = blogs.find(b => b.title === "Kuro's Third Blog").likes
        assert.strictEqual(blogLikes, 0)
    })

    test('Missing title/url for post request throws a 400 error', async () => {
        const newBlog = {
            author: "Kuro",
            likes: 12
        }
        await api.post('/api/blogs')
            .set("Authorization", `Bearer ${token}`)
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('Blog is deleted successfully', async () => {
        const blogs = await getBlogs()
        const blogToDelete = blogs[0]
        await api.delete(`/api/blogs/${blogToDelete.id}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(204)
        const newBlogs = await getBlogs()
        const blogIds = newBlogs.map(b => b.id)
        assert(!blogIds.includes(blogToDelete.id))
        assert.strictEqual(blogs.length - 1, newBlogs.length)
    })

    test('Blog post is updated successfully', async () => {
        const blogs = await getBlogs()
        const blogToUpdate = blogs[0]
        blogToUpdate.title = 'Updated title'
        await api.put(`/api/blogs/${blogToUpdate.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(blogToUpdate)
            .expect(200)
        const updatedBlogs = await getBlogs()
        const blogTitles = updatedBlogs.map(b => b.title)
        assert(blogTitles.includes('Updated title'))
    })
})