import test from 'tape'
import isNil from './'

test('isNil', t => {
  test('returns true when value is undefined or null', t => {
    t.equal(isNil(void 0), true)
    t.equal(isNil(null), true)
    t.equal(isNil(undefined), true)
    t.end()
  })

  test('returns false when value is not undefined or null', t => {
    t.equal(isNil([]), false)
    t.equal(isNil({}), false)
    t.equal(isNil(0), false)
    t.equal(isNil(''), false)
    t.equal(isNil(''), false)
    t.end()
  })

  t.end()
})
