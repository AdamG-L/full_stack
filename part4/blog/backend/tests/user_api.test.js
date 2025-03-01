const { test, after, describe, beforeEach } = require('node:test')
const { getUsers, initialUsers } = require('./userTestHelper')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

describe('User API Tests', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        await Promise.all(initialUsers.map(u => new User(u).save()))
    })
    after(async () => {
        await mongoose.connection.close()
    })
    test('Error when username is less than 3 char', async() => {
        const user = {
            username: "Ba",
            name: "Bad Username",
            password: "password"
        }
        await api.post('/api/users')
        .send(user)
        .expect(400)
        users = await getUsers()
        assert(users.length, 2)
    })
    test('Error when password is less than 3 char', async() => {
        const user = {
            username: "Baka",
            name: "Bad Password",
            password: "pa"
        }
        await api.post('/api/users')
        .send(user)
        .expect(400)
        users = await getUsers()
        assert(users.length, 2)
    })
})