import test from 'tape'
import range from './'

test('range', t => {
  t.deepEqual(range(0, 0), [])
  t.deepEqual(range(0, 1), [0])
  t.deepEqual(range(0, 3), [0, 1, 2])
  t.deepEqual(range(5, 9), [5, 6, 7, 8])
  t.deepEqual(range(8, 5), [])

  t.end()
})
