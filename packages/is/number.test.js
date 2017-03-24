import test from 'tape'
import isNumber from './number'

test('isNumber', t => {
  t.test('are numbers', t => {
    t.true(isNumber(1), 'number is number')
    t.true(isNumber(123), 'numbers is number')
    t.true(isNumber(123), 'numbers is number')
    t.true(isNumber(Number()), 'Number() is a number')
    t.end()
  })

  t.test('are not numbers', t => {
    t.false(isNumber(NaN), 'NaN is not a number... good grief JS. You break my heart sometimes.')
    t.false(isNumber(new Number(1)), 'new Number() object is not a number')
    t.end()
  })

  t.end()
})
