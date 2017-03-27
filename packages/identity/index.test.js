import test from 'tape'
import identity from './'

test('identity', t => {
  t.equal(identity(123), 123)
  t.deepEqual(identity([]), [])
  t.deepEqual(identity({}), {})
  t.equal(identity(undefined), undefined)
  t.equal(identity(null), null)

  try {
    t.equal(typeof identity(), 'function', 'is curried')
    t.equal(identity()()(123), 123)
  } catch (err) {
    t.fail("curry isn't working")
  }
  t.end()
})
