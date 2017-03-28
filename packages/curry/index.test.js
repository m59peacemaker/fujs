import test from 'tape'
import curry from './'
import testCurry from '../../lib/test-curry'
import range from '../range'

test('curryN', t => {
  range(0, 7).forEach(i => {
    testCurry({name: `curry(${i})`, curry: curry.bind(undefined, i), n: i, test: t.test})
  })
  //t.equal(curry()()()()()((a, b) => {}).length, 2, 'curry is curried')
  t.end()
})
