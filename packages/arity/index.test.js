import test from 'tape'
import arity from './_'
import range from '../range'

const fn = () => {}

test('arity', t => {
  range(0, 11).forEach(i => {
    t.equal(arity(i, fn).length, i)
  })
  t.end()
})
