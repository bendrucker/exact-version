'use strict'

const test = require('tape')
const exact = require('./')

test('exact versions -> true', function (t) {
  t.ok(exact('4.0.0'))
  t.ok(exact('=4.0.0'))
  t.end()
})

test('range versions -> false', function (t) {
  t.notOk(exact('~4.0.0'))
  t.notOk(exact('^4.0.0'))
  t.notOk(exact('1.2.x'))
  t.notOk(exact('>= 4.0.0'))
  t.notOk(exact('<= 4.0.0'))
  t.notOk(exact('4.0.0 || 4.0.1'))
  t.end()
})

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
  '#semver:2.x'
]

const exactRefs = [
  '#master',
  '#jj-abrams',
  '#9bfce8f957a80c93d5c6365377d07a59034c6482',
  '#semver:1.0.0'
]

test('exact commitish strings -> true', function (t) {
  baseURLs.forEach((baseURL) => {
    exactRefs.forEach((ref) => {
      const s = `${baseURL}${ref}`
      t.ok(exact(s), `${s} is exact`)
    })
  })
  t.end()
})

test('range commit-ish strings -> false', function (t) {
  baseURLs.forEach((baseURL) => {
    rangeRefs.forEach((ref) => {
      const s = `${baseURL}${ref}`
      t.notOk(exact(s), `${s} refers to a range`)
    })
  })
  t.end()
})
