import test from 'tape'
import cat from './'

test('cat', t => {
  t.deepEqual(
    cat([ [ 1, 2 ], [ 3, 4 ] ]),
    [ 1, 2, 3, 4 ],
    'cats arrays'
  )
  t.deepEqual(
    cat([ [ 1, 2 ], 'foo', [ [ 1 ] ], { a: 1 }, [ 3, 4 ] ]),
    [ 1, 2, 'f', 'o', 'o', [ 1 ], [ 'a', 1 ], 3, 4 ],
    'cats complicated array'
  )
  // I dunno
  t.deepEqual(
    cat({ a: { b: 1 } }),
    { b: 1 },
    'cats object'
  )

  t.end()
})
