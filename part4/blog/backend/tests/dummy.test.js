const { test, describe } = require('node:test')
const assert = require('node:assert')
const {dummy} = require('../utils/list_helper')

describe('Dummy tests', () =>{
    test('dummy returns one', () => {
        const blogs = []
        assert.strictEqual(dummy(blogs), 1)
    })
})