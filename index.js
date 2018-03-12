'use strict'

// Consider it a range if we detect:
//  - An empty string
//  - Any of the symbols ^*~<>|
//  - A digit followed by .x
//  - A hyphenated range like "a.b.c - d.e.f"
const rangeRegEx = /^$|[\^*~<>|]|(\d+\.x)|(\d+(\.\d)*\s*-\s*\d+(\.\d)*)/
const nestedSemVerRegEx = /#semver:(.*)$/

function extractSemVer (s) {
  let result = null
  const match = s.match(nestedSemVerRegEx)
  if (match) {
    result = match[1]
  }
  return result
}

module.exports = function exactVersion (versionString) {
  if (typeof versionString !== 'string') {
    return false
  }
  const nestedSemVer = extractSemVer(versionString)
  const semVerString = nestedSemVer === null ? versionString : nestedSemVer

  return !rangeRegEx.test(semVerString)
}
