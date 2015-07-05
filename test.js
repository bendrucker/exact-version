'use strict'

var test = require('tape')
var exact = require('./')

test(function (t) {
  t.ok(exact('4.0.0'))
  t.ok(exact('=4.0.0'))
  t.notOk(exact('~4.0.0'))
  t.notOk(exact('^4.0.0'))
  t.notOk(exact('>= 4.0.0'))
  t.notOk(exact('<= 4.0.0'))
  t.end()
})
