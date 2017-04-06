import test from 'tape'
import into from '../into'
import cat from './'
import { catWith, catWithKey } from './'

test('cat', t => {
  t.deepEqual(
    cat([ [ 1, 2 ], [ 3, 4 ] ]),
    [ 1, 2, 3, 4 ],
    'cats arrays'
  )
  t.deepEqual(
    cat([ [ 1, 2 ], 'foo', [ [ 1 ] ], { a: 1 }, [ 3, 4 ] ]),
    [ 1, 2, 'f', 'o', 'o', [ 1 ], [ 'a', 1 ], 3, 4 ],
    'cats any iterable'
  )
  t.deepEqual(
    into({}, cat, [ { a: 1, b: 1 }, { b: 2 } ]),
    { a: 1, b: 2 },
    'cats objects'
  )
  t.deepEqual(
    into({}, cat, [ { a: 1 }, { a: null }, { b: { c: 3 } } ]),
    { a: null, b: { c: 3 } },
    'values are updated for keys already assigned'
  )

  t.deepEqual(
    into(
      {},
      catWith(v => 12345),
      [ { a: 1 }, { a: null }, { b: { c: 3 } } ]
    ),
    { a: 12345, b: { c: 3 } },
    'catWith'
  )

  t.deepEqual(
    into(
      {},
      catWith((a, b) => a.concat(b)),
      [ { a: [ 1 ] }, { a: [ 2 ] }, { b: { c: 3 } } ]
    ),
    { a: [ 1, 2 ], b: { c: 3 } },
    'catWith(concat)'
  )


  t.deepEqual(
    into(
      {},
      catWithKey((k, a, b) => k + a + b),
      [ { foo: 'bar' }, { foo: 'baz' }, { b: { c: 3 } } ]
    ),
    { foo: 'foobarbaz', b: { c: 3 } },
    'catWithKey'
  )

  t.end()
})
