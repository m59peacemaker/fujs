import test from 'tape'
import into from '../into'
import map from './'

const inc = v => v + 1

test('map', t => {
  t.deepEqual(
    map(inc, [ 1, 2 ]),
    [ 2, 3 ],
    'operates on an array'
  )
  t.deepEqual(
    map(([k, v]) => [k, inc(v)], { a: 1, b: 2 }),
    { a: 2, b: 3 },
    'operates on an object'
  )
  t.deepEqual(
    into([], map(inc), [ 1, 2 ]),
    [ 2, 3 ],
    'returns a transducer'
  )

  t.end()
})
