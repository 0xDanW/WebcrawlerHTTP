const { sortPages } = require('./report.js')
const { test, expect } = require('@jest/globals')


test('sortPages', () => {
    const input = {
        'https://waglane.dev/path': 1,
        'https://waglane.dev': 3
    }
    const actual = sortPages(input)
    const expected = [
        ['https://waglane.dev', 3],
        ['https://waglane.dev/path', 1]
    ]
    expect(actual).toEqual(expected)
})

test('sortPages 5 pages', () => {
    const input = {
        'https://waglane.dev/path': 1,
        'https://waglane.dev': 3,
        'https://waglane.dev/path2': 5,
        'https://waglane.dev/path3': 2,
        'https://waglane.dev/path4': 9
    }
    const actual = sortPages(input)
    const expected = [
        ['https://waglane.dev/path4', 9],
        ['https://waglane.dev/path2', 5],
        ['https://waglane.dev', 3],
        ['https://waglane.dev/path3', 2],
        ['https://waglane.dev/path', 1]
    ]
    expect(actual).toEqual(expected)
})