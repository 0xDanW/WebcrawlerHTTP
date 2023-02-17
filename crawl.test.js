const { normalizeURL, getURLsFromHTML } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

// Test #1: Normalize URL by stripping the protocol away
test('normalizeURL strip HTTPS protocol', () => {
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
test('normalizeURL strip HTTP protocol', () => {
    const input = 'http://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path' 
    expect(actual).toEqual(expected)
})

// Test #5: Find Absolute links from HTML
test('getURLsFromHTML absolute', () => {
    const inputBaseHTTP = `
<html>
    <body>
        <a href="https://blog.boot.dev/path/">
            Boot.dev Blog
        </a>
    </body>
</html>
`
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputBaseHTTP, inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

// Test #6: Find Relative links from HTML
test('getURLsFromHTML relative', () => {
    const inputBaseHTTP = `
<html>
    <body>
        <a href="/path/">
            Boot.dev Blog
        </a>
    </body>
</html>
`
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputBaseHTTP, inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

// Test #7: Find both Absolute and Relative links from HTML
test('getURLsFromHTML relative', () => {
    const inputBaseHTTP = `
<html>
    <body>
        <a href="https://blog.boot.dev/path1/">
            Boot.dev Blog Path One
        </a>
        <a href="/path2/">
            Boot.dev Blog Path Two
        </a>
    </body>
</html>
`
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputBaseHTTP, inputBaseURL)
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected)
})

// Test #8: Identify invalid links from HTML
test('getURLsFromHTML relative', () => {
    const inputBaseHTTP = `
<html>
    <body>
        <a href="invalid">
            Invalid URL
        </a>
    </body>
</html>
`
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputBaseHTTP, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})

