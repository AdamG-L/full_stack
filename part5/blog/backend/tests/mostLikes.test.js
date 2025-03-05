const { test, describe } = require('node:test')
const assert = require('node:assert')
const {mostLikes} = require('../utils/list_helper')

describe('mostLikes tests', () =>{
    test('when list has multiple blogs, returns author with most likes', () => {
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
                _id: "5a422aa71b54a676234d17f8",
                title: "Go To Statement Considered Harmful",
                author: "Edsger W. Dijkstra",
                url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                likes: 5,
                __v: 0
            }
        ]
        const res = {
            author: "Michael Chan",
            likes: 7
        }
        assert.deepStrictEqual(mostLikes(blogs), res)
      })

      test('when list has multiple posts from same author, takes into consideration sum of likes', () => {
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
                _id: "5a422a851b54a676234d17f8",
                title: "React Damage",
                author: "Michael Chan",
                url: "https://reactdamage.com/",
                likes: 7,
                __v: 0
            },
            {
                _id: "5a422aa71b54a676234d17f8",
                title: "Go To Statement Considered Harmful",
                author: "Edsger W. Dijkstra",
                url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                likes: 12,
                __v: 0
            }
        ]
        const res = {
            author: "Michael Chan",
            likes: 14
        }
        assert.deepStrictEqual(mostLikes(blogs), res)
      })
})