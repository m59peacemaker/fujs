import test from 'tape'
import normalizeXf from '../transducer-utils/normalize-xf'
import Reduced from '../transducer-utils/reduced'
import reduce from './'

test('reduce', t => {
  t.deepEqual(
    reduce((acc, v) => {
      acc.push(v + 'x')
      return acc
    }, [], [ 'a', 'b', 'c' ]),
    [ 'ax', 'bx', 'cx' ],
    'works with regular function'
  )

  t.deepEqual(
    reduce((acc, v) => {
      acc.push(v + 'x')
      return Reduced(acc)
    }, [], [ 'a', 'b', 'c' ]),
    [ 'ax' ],
    'short circuits when regular function returns Reduced'
  )

  t.deepEqual(
    reduce((acc, v) => {
      acc.push(v)
      return acc
    }, [], { foo: 'bar', baz: 'qux' }),
    [ [ 'foo', 'bar' ], [ 'baz', 'qux' ] ],
    'reduces object'
  )

  const nextStep = (acc, v) => acc + v
  t.deepEqual(
    reduce(normalizeXf((acc, v) => {
      return typeof v === 'number' ? nextStep(acc, v) : acc
    }), 0, [ 'x', 2, 3, 'y', 5 ]),
    10,
    'works with transformer object'
  )

  t.end()
})
