import test from 'tape'
import complement from './'

test('complement', t => {
  t.equal(complement(() => true)(), false)
  t.equal(complement(() => false)(), true)
  t.true(complement(() => 0)())
  t.false(complement(() => 'hey')())
  t.end()
})
