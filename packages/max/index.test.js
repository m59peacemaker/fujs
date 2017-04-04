import test from 'tape'
import max from './'

test('max', t => {
  t.equal(max(2, 4), 4),
  t.equal(max('a')('b'), 'b')

  t.end()
})
