import test from 'tape'
import curry from './'

test('curry', t => {
  t.equal(curry((a, b) => a + b)()()(3)()(7), 10)
  t.end()
})
