import test from 'tape'
import range from './'

test('range', t => {
  t.deepEqual(range(0, 0), [])
  t.deepEqual(range(0, 1), [0])
  t.deepEqual(range(0, 3), [0, 1, 2])
  t.deepEqual(range(5, 9), [5, 6, 7, 8])
  t.deepEqual(range(8, 5), [])
  t.test('should throw when argument is not of type "number"', t => {
    try {
      range(123, '456')
      t.fail()
    } catch (err) {
      t.pass()
    }
    t.end()
  })
  t.end()
})
