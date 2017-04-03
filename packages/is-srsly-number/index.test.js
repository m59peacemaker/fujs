import test from 'tape'
import srslyNumber from './srsly-number'

test('srslyNumber', t => {
  t.test('are numbers', t => {
    t.true(srslyNumber(1), 'number is number')
    t.true(srslyNumber(123), 'numbers is number')
    t.true(srslyNumber(123), 'numbers is number')
    t.true(srslyNumber(Number()), 'Number() is a number')
    t.end()
  })

  t.test('are not numbers', t => {
    t.false(srslyNumber(NaN), 'NaN is not a number... good grief JS. You break my heart sometimes.')
    t.false(srslyNumber(new Number(1)), 'new Number() object is not a number')
    t.end()
  })

  t.end()
})
