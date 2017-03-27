import test from 'tape'
import curry4 from './'
import testCurry from '../../lib/test-curry'

test('curry4', t => {
  testCurry({name: 'curry4', curry: curry4, n: 4, test: t.test})
  t.equal(curry4()()()()()(() => {}).length, 4, 'curry4 is curried')
  t.end()
})
