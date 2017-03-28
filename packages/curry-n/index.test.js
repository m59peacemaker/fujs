import test from 'tape'
import curryN from './'
import testCurry from '../../lib/test-curry'
import range from '../range'

test('curryN', t => {
  range(0, 7).forEach(i => {
    testCurry({name: `curryN(${i})`, curry: curryN(i), n: i, test: t.test})
  })
  t.end()
})
