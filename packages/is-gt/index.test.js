import test from 'tape'
import isGt from './'

test('isGt', t => {
  t.equal(isGt(3)(4), true)
  t.equal(isGt(4, 3), false)
  t.equal(isGt('a')('b'), true)
  t.equal(isGt(NaN, {}), false)
  t.equal(isGt({}, NaN), false)

  t.end()
})
