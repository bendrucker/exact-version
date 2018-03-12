'use strict'

// Consider it a range if we see any of the symbols ^~<>| or a digit followed by ".x"
var regex = /[\^~<>|]|\d\.x/

module.exports = function exactVersion (version) {
  return !regex.test(version)
}
