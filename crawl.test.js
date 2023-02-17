const { normalizeURL } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

// Test #1: Normalize URL by stripping the protocol away
test('normalizeURL strip protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})


// Test #2: Normalize URL by stripping any trailing "/"
test('normalizeURL strip trailing slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path' 
    expect(actual).toEqual(expected)
})

// Test #3: Normalize URL by stripping any capitalized letters
test('normalizeURL capitals', () => {
    const input = 'https://BLOG.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path' 
    expect(actual).toEqual(expected)
})

// Test #4: Normalize URL by stripping HTTP protocol
test('normalizeURL capitals', () => {
    const input = 'http://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path' 
    expect(actual).toEqual(expected)
})