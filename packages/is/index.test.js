import test from 'tape'
import is from './'
import { isString, isNumber, isNil, isRegExp } from './'

test('is', t => {
  test('default export is an object of functions like is.nil', t => {
    t.true(is.string(' '))
    t.true(is.number(123))
    t.true(is.nil(undefined))
    t.true(is.regExp(/$/))
    t.end()
  })

  test('exports functions', t => {
    t.true(isString(' '))
    t.true(isNumber(123))
    t.true(isNil(undefined))
    t.true(isRegExp(/$/))
    t.end()
  })
  t.end()
})
