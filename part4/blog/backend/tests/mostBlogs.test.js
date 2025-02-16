const { test, describe } = require('node:test')
const assert = require('node:assert')
const { mostBlogs } = require('../utils/list_helper')

describe('mostBlogs Tests:', () => {
    test('when given multiple blogs, the author with the most blogs is returned', () => {
        const blogs = [
            {
              _id: "5a422a851b54a676234d17f7",
              title: "React patterns",
              author: "Michael Chan",
              url: "https://reactpatterns.com/",
              likes: 7,
              __v: 0
            },
            {
              _id: "5a422b891b54a676234d17fa",
              title: "First class tests",
              author: "Robert C. Martin",
              url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
              likes: 10,
              __v: 0
            },
            {
              _id: "5a422ba71b54a676234d17fb",
              title: "TDD harms architecture",
              author: "Robert C. Martin",
              url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
              likes: 0,
              __v: 0
            }
          ]

        res = {
            author: "Robert C. Martin",
            blogs: 2
        }
        assert.deepStrictEqual(mostBlogs(blogs), res)
    })
})