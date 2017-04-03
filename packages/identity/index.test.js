import test from 'tape'
import identity from './'

test('identity', t => {
  t.equal(identity(123), 123)
  t.deepEqual(identity([]), [])
  t.deepEqual(identity({}), {})
  t.equal(identity(undefined), undefined)
  t.equal(identity(null), null)

  t.end()
})
