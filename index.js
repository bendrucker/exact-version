'use strict'

// Consider it a range if we detect:
//  - An empty string
//  - Any of the symbols ^*~<>|
//  - A digit followed by .x
//  - A hyphenated range like "a.b.c - d.e.f"
const rangeRegEx = /^$|[\^*~<>|]|(\d+\.x)|(\d+(\.\d)*\s*-\s*\d+(\.\d)*)/
const commitishSemverRegEx = /#semver:(.*)$/

function extractSemVer (s) {
  let result = null
  if (typeof s === 'string') {
    const match = s.match(commitishSemverRegEx)
    if (match) {
      result = match[1]
    }
  }
  return result
}

module.exports = function exactVersion (versionString) {
  const nestedSemVer = extractSemVer(versionString)
  const semVerString = nestedSemVer === null ? versionString : nestedSemVer

  return !rangeRegEx.test(semVerString)
}
