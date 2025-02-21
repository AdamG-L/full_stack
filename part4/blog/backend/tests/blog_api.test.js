const { test, after, describe, beforeEach } = require('node:test')
const { initialBlogs, getBlogs } = require('./testHelper')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')
const api = supertest(app)

describe('Backend API Tests:', () => {

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
})