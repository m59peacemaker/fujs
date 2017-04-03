import test from 'tape'
import range from '../range'
import arity from './'

const fn = () => {}

test('arity', t => {
  range(0, 11).forEach(i => {
    t.equal(arity(i, fn).length, i)
  })
  t.end()
})
