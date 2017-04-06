import test from 'tape'
import into from '../into'
import filter from './'
import map from '../map'
import pipe from '../pipe'
import compose from '../compose'

const not2 = v => v !== 2

test('filter', t => {
  t.deepEqual(
    filter(not2, [ 1, 2, 3 ]),
    [ 1, 3 ],
    'operates on an array'
  )
  t.deepEqual(
    filter(v => not2(v[1]), { a: 1, b: 2, c: 3 }),
    { a: 1, c: 3 },
    'operates on an object'
  )
  t.deepEqual(
    into([], filter(not2), [ 1, 2, 3 ]),
    [ 1, 3 ],
    'returns a transducer'
  )
  t.deepEqual(
    into([], compose(
      map(v => v + 1),
      filter(not2)
    ), [ 1, 2, 3 ]),
    [ 3, 4 ]
  )

  t.end()
})
