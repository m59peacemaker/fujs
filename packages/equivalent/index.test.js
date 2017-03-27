import test from 'tape'

test('equivalant', t => {
  ;[
    [
      [ 1, 2, 3 ],
      [ 1, 2, 3 ]
    ],
    [
      [ 'a' ],
      [ 'a' ]
    ],
    [
      { foo: 'foo' },
      { foo: 'foo' }
    ],
    [
      { foo: [ 1 ] },
      { foo: [ 1 ] }
    ],
    [
      [ { 'x': 'y', '123': true }, false, undefined, [ null ] ],
      [ { 'x': 'y', 123: true }, false, undefined, [ null ] ]
    ],
    [ true, true ],
    [ 'foo', 'foo' ],
    [ [], [] ],
    [ {}, {} ],
    [ 0, 0 ],
    [ Array, Array ]
  ].forEach(set => {
    t.deepEqual(set[0], set[1], JSON.stringify(set[0]))
  })

  ;[
    [
      [ 1, 2, 3 ],
      [ 1, 2, '3' ]
    ],
    [
      [ 'a' ],
      [ 'b' ]
    ],
    [
      { foo: 'foo' },
      { fo: 'foo' }
    ],
    [
      { foo: [ 1 ] },
      { foo: [ 1 ], bar: [ 1 ] }
    ],
    [
      [ { 'x': 'y', '123': true }, false, undefined, [ null ] ],
      [ { 'x': 'y', '123': true }, false, [ null ] ]
    ],
    [ true, false ],
    [ 'foo', 'f!o' ],
    [ 0, 1 ],
    [ Array, Object ]
  ].forEach(set => {
    t.notDeepEqual(set[0], set[1])
  })

  t.end()
})
