import test from 'tape'
import isSrslyNumber from './'

test('isSrslyNumber', t => {
  t.test('are numbers', t => {
    t.true(isSrslyNumber(1), 'number is number')
    t.true(isSrslyNumber(123), 'numbers is number')
    t.true(isSrslyNumber(123), 'numbers is number')
    t.true(isSrslyNumber(Number()), 'Number() is a number')
    t.end()
  })

  t.test('are not numbers', t => {
    t.false(isSrslyNumber(NaN), 'NaN is not a number... good grief JS. You break my heart sometimes.')
    t.false(isSrslyNumber(new Number(1)), 'new Number() object is not a number')
    t.end()
  })

  t.end()
})
