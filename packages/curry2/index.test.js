import test from 'tape'
import curry2 from './'
import testCurry from '../../lib/test-curry'

test('curry2', t => {
  testCurry({name: 'curry2', curry: curry2, n: 2, test: t.test})
  t.equal(curry2()()()()()(() => {}).length, 2, 'curry2 is curried')
  t.end()
})
