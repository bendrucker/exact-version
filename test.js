'use strict'

const test = require('tape')
const exact = require('./')

test('exact versions -> true', function (t) {
  console.log('--------------\r\n\r\n')
  t.ok(exact('4.0.0'), 'Typical 3-tiered version number')
  console.log('\r\n\r\n')
  t.ok(exact('1.8.3-beta.1'), 'Tagged version')
  t.ok(exact('=4.0.0'), "= (this doesn't appear to be part of the official spec)")
  t.end()
})

test('range versions -> false', function (t) {
  t.notOk(exact(''), 'Blank/empty is the same as *')
  t.notOk(exact('*'), '* means anything')
  t.notOk(exact('~4.0.0'), '~ specifies as range')
  t.notOk(exact('^4.0.0', '^ specifies a range'))
  t.notOk(exact('1.x'), '<digit>.x specifies a range')
  t.notOk(exact('3.15.x'), '<digit>.<digit>.x specifies a range')
  t.notOk(exact('>= 4.0.0'), '>= specifies a range')
  t.notOk(exact('<= 4.0.0'), '<= specifies a range')
  t.notOk(exact('>=2.0.0 <=2.2.3'), '>= and <= specify ranges')
  t.notOk(exact('>=1.0.0 <=1.0.0'), 'Although mathematically ">=1.0.0 <=1.0.0" is a range of 1, we still treat it this as a range')
  t.notOk(exact('2.0.0 - 2.2.3'), 'Hyphen is just like >= and <=')
  t.notOk(exact('4.0.0 || 4.0.1'), 'Logical OR should be considered a range')
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
  '#semver:*',
  '#semver:',
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

test('Miscellaneous exact -> true', function (t) {
  const url = 'http://asdf.com/asdf.tar.gz'
  t.ok(exact(url), `URL ('${url}') should be considered exact`)

  const localFile = '../some/file.js'
  t.ok(exact(localFile), `Local file ('${localFile}') should be considered exact`)

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
