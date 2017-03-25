import test from 'tape'
import is from './'
import {
  isNil,
  isRegExp,
  isString,
  srslyNumber,
  srslyObject
} from './'

test('is', t => {
  test('default export is an object of functions like is.nil', t => {
    t.true(is.nil(undefined), 'is.nil')
    t.true(is.regExp(/$/), 'is.regExp')
    t.true(is.string(' '), 'is.string')
    t.true(is.srslyNumber(123), 'is.srslyNumber')
    t.true(is.srslyObject({}), 'is.srslyObject')
    t.end()
  })

  test('exports functions', t => {
    t.true(isNil(undefined), 'isNil')
    t.true(isRegExp(/$/), 'isRegExp')
    t.true(isString(' '), 'isString')
    t.true(srslyNumber(123), 'srslyNumber')
    t.true(srslyObject({}), 'srslyObject')
    t.end()
  })
  t.end()
})
