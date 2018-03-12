'use strict'

const test = require('tape')
const exact = require('./')

const baseURLs = [
  'git@github.com:bendrucker/exact-version.git#master',
  'github.com:bendrucker/exact-version.git',
  'bendrucker/exact-version.git',
  'https://github.com:bendrucker/exact-version.git',
  'git+ssh://git@github.com:substack/tape.git'
]

const rangeRefs = [
  '#semver:^5.0',
  '#semver:~1.2.0',
  '#semver:*',
  '#semver:',
  '#semver:2.x'
]

const exactRefs = [
  '#master',
  '#something-with-hyphens',
  '#9bfce8f957a80c93d5c6365377d07a59034c6482',
  '#semver:1.0.0'
]

const generateUrls = (baseURLs, refs) => {
  return baseURLs.reduce((urls, baseURL) => {
    return urls.concat(refs.map(ref => `${baseURL}${ref}`))
  }, [])
}

const exactURLs = generateUrls(baseURLs, exactRefs)
const rangeURLs = generateUrls(baseURLs, rangeRefs)

test('exact versions -> true', function (t) {
  [
    '4.0.0',
    '1.8.3-beta.1',
    '=4.0.0', // Note: this doesn't appear to be part of the official spec
    'http://asdf.com/asdf.tar.gz',
    '../some/file.js'
  ].concat(exactURLs).forEach(input => t.ok(exact(input), input))
  t.end()
})

test('range versions -> false', function (t) {
  [
    '',
    '*',
    '~4.0.0',
    '^4.0.0',
    '1.x',
    '3.15.x',
    '>= 4.0.0',
    '<= 4.0.0',
    '>=2.0.0 <=2.2.3',
    '>=1.0.0 <=1.0.0', // Although mathematically ">=1.0.0 <=1.0.0" is a range of 1, we still treat it this as a range
    '2.0.0 - 2.2.3',
    '4.0.0 || 4.0.1'
  ].concat(rangeURLs).forEach(input => t.notOk(exact(input), input))
  t.end()
})
