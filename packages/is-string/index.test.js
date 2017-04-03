import test from 'tape'
import isString from './string'

test('isString', t => {
  t.true(isString(''), 'empty string is string')
  t.true(isString('123'), 'string of numbers is string')
  t.false(isString(new String('abc')), 'string object is not a string')
  t.end()
})
