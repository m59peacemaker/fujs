import test from 'tape'
import curry3 from './'
import testCurry from '../../lib/test-curry'

test('curry3', t => {
  testCurry({name: 'curry3', curry: curry3, n: 3, test: t.test})
  t.equal(curry3()()()()()(() => {}).length, 3, 'curry3 is curried')
  t.end()
})
