const { test, after, describe, beforeEach } = require('node:test')
const { initialBlogs, getBlogs } = require('./testHelper')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')
const api = supertest(app)

describe('Blog API Tests:', () => {

    beforeEach(async () => {
        await Blog.deleteMany({})
        await Promise.all(initialBlogs.map(b => new Blog(b).save()))
    })
    after(async () => {
        await mongoose.connection.close()
    })

    test('get request returns 2 blogs', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, initialBlogs.length)
    })

    test('backend return modifies _id to id', async () => {
        const response = await api.get('/api/blogs')
        const blog = response.body[0]
        assert.strictEqual('id' in blog, true)
        assert.strictEqual('_id' in blog, false)
    })

    test('working post requests', async () => {
        const newBlog = {
            _id: "5a422aa71b54a676234d17f0",
            title: "A really cool post",
            author: "Adam G",
            url: "https://tracker.gg/marvel-rivals/profile/ign/SillyKuro/overview?mode=competitive",
            likes: 100,
            __v: 0
        }
        await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        const blogs = await getBlogs()
        assert.strictEqual(blogs.length, initialBlogs.length+1)
        const urls = blogs.map(b => b.url)
        assert(urls.includes("https://tracker.gg/marvel-rivals/profile/ign/SillyKuro/overview?mode=competitive"))
    })

    test('if (like) value missing, default will be 0', async () => {
        const newBlog = {
            title: "A really cool post",
            author: "Adam G",
            url: "https://tracker.gg/marvel-rivals/profile/ign/SillyKuro/overview?mode=competitive"
        }
        await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        const blogs = await getBlogs()
        const blogLikes = blogs.find(b => b.title === "A really cool post").likes
        assert.strictEqual(blogLikes, 0)
    })

    test('Missing title/url for post request throws a 400 error', async () => {
        const newBlog = {
            author: "Adam G",
            likes: 12
        }
        await api.post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    }
    )

    test('Blog is deleted successfully', async () => {
        const blogs = await getBlogs()
        const blogToDelete = blogs[0]
        await api.delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
        const newBlogs = await getBlogs()
        const blogIds = newBlogs.map(b => b.id)
        assert(!blogIds.includes(blogToDelete.id))
        assert.strictEqual(blogs.length-1, newBlogs.length)
    })

    test('Blog post is updated successfully', async() => {
        const blogs = await getBlogs()
        const blogToUpdate = blogs[0]
        blogToUpdate.title = 'Updated title'
        await api.put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)
        const updatedBlogs = await getBlogs()
        const blogTitles = updatedBlogs.map(b => b.title)
        assert(blogTitles.includes('Updated title'))
    })
})