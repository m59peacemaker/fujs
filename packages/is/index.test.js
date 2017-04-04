import test from 'tape'
import is from './'

test('is', t => {
  t.equal(is(123, 123), true)
  t.equal(is(Object, Object), true)
  t.equal(is('foo')('foo'), true)
  t.equal(is([])([]), false)

  t.end()
})
