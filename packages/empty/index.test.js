import test from 'tape'
import empty from './'

test('empty', t => {
  t.deepEqual(empty([ 1, 2, 3 ]), [])
  t.deepEqual(empty({ a: 'a', b: 'b' }), {})
  t.equal(empty('foo'), '')

  t.end()
})
