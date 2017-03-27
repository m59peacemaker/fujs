import test from 'tape'
import isCurried from './is-curried'
import curry2 from '../packages/curry2'

const add= (a, b) => a + b

test('isCurried', t => {
  t.equal(isCurried(curry2(add), [2, 4], 6), true)
  t.equal(isCurried(add, [2, 4], 4), false)
  try {
    isCurried(curry2(add), [2], 2) // inputArgs not same length as add.length
    t.fail('should have thrown when not given enough inputArgs')
  } catch (err) {
    t.pass('threw when given less inputArgs than fn takes')
  }
  t.end()
})
