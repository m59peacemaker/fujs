import test from 'tape'
import transduce from './'

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

test('transduce', t => {
  t.deepEqual(
    transduce(arrayBuilderXf, [ 1, 2 ], incTransducer, [ 100, 200 ]),
    [ 1, 2, 101, 201 ],
    'transformer object builder'
  )

  t.deepEqual(
    transduce((acc, [k, v]) => {
      acc[k] = v
      return acc
    }, {}, incTransducer, { foo: 1, bar: 2 }),
    { foo: 2, bar: 3 },
    'transformers fn builder'
  )

  t.end()
})
