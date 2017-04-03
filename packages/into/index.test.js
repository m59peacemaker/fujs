import test from 'tape'
import into from './'

const arrayBuilderXf = {
  '@@transducer/init': () => [],
  '@@transducer/result': v => v,
  '@@transducer/step': (result, input) => {
    result.push(input)
    return result
  }
}

const incTransducer = (nextXf) => {
  return {
    '@@transducer/init': nextXf['@@transducer/init'],
    '@@transducer/result': nextXf['@@transducer/result'],
    '@@transducer/step': (result, v) => {
      if (v[1] !== undefined) {
        v = [ v[0], v[1] + 1 ] // for [ k, v ] pairs
      } else {
        v = v + 1
      }
      return nextXf['@@transducer/step'](result, v)
    }
  }
}

test('into', t => {
  t.deepEqual(
    into(arrayBuilderXf, incTransducer, [ 1, 2, 3 ]),
    [ 2, 3, 4 ],
    'transformer object sink'
  )

  t.deepEqual(
    into((acc, v) => acc === undefined ? v : acc + v, incTransducer, [ 1, 2, 3 ]),
    9,
    'transformer function sink'
  )

  t.deepEqual(
    into([], incTransducer, [ 1 ]),
    [ 2 ],
    'array into array'
  )
  t.deepEqual(
    into({}, incTransducer, [ [ 'a', 1 ], [ 'b', 2 ] ]),
    { a: 2, b: 3 },
    'array into object'
  )
  t.deepEqual(
    into({}, incTransducer, [ 'a', 1, [ 'b', 2 ] ]),
    { a1: null, '2': null, b: 3 },
    'array into object - awkward'
  )
  t.deepEqual(
    into('', incTransducer, [ 1, 2, 3 ]),
    '234',
    'array into string'
  )
  // TODO: what should happen here?
  t.deepEqual(
    into('', incTransducer, [ 1, { foo: 'bar' }, 3 ]),
    '2[object Object]14',
    'array into string - awkward'
  )

  t.deepEqual(
    into({}, incTransducer, { foo: 1 }),
    { foo: 2 },
    'object into object'
  )
  t.deepEqual(
    into([], incTransducer, { a: 1, b: 2 }),
    [ [ 'a', 2 ], [ 'b', 3 ] ],
    'object into array'
  )
  // TODO: what should happen here?
  t.deepEqual(
    into('', incTransducer, { a: 1, b: 'b'}),
    'a,2b,b1',
    'object into string'
  )

  t.equal(
    into('', incTransducer, 'abc'),
    'a1b1c1',
    'string into string'
  )
  t.deepEqual(
    into([], incTransducer, 'abc'),
    [ 'a1', 'b1', 'c1' ],
    'string into array'
  )
  t.deepEqual(
    into({}, incTransducer, 'abc'),
    { a1: null, b1: null, c1: null },
    'string into object'
  )

  t.deepEqual(
    into([ 1, 2 ], incTransducer, [ 10 ]),
    [ 1, 2, 11 ],
    'into not empty array'
  )
  t.deepEqual(
    into({ a: 1 }, incTransducer, [ [ 'b', 2 ] ]),
    { a: 1, b: 3 },
    'into not empty object'
  )
  t.equal(
    into('foo', incTransducer, [ 1, 2 ]),
    'foo23',
    'into not empty string'
  )

  t.end()
})
