import test from 'tape'
import into from '../into'
import pipe from '../pipe'
import compose from '../compose'
import filter from '../filter'
import reduce from '../reduce'
import reduceBy from './'

test('reduceBy', t => {
  t.deepEqual(
    into({}, reduceBy(v => v.type), [
      { type: 'foo', value: 123 }
    ]),
    {
      foo: [ { type: 'foo', value: 123 } ]
    }
  )

  t.deepEqual(
    into({}, reduceBy(v => v.type), [
      { type: 'foo', value: 123 },
      { type: 'foo', value: 456 },
      { type: 'bar', value: 456 }
    ]),
    {
      foo: [
        { type: 'foo', value: 123 },
        { type: 'foo', value: 456 }
      ],
      bar: [
        { type: 'bar', value: 456 }
      ]
    }
  )

  t.deepEqual(
    pipe(
      into({}, reduceBy(v => v.type)),
      filter(([k, v]) => v.length > 1)
    )([
      { type: 'foo', value: 123 },
      { type: 'foo', value: 456 },
      { type: 'bar', value: 456 }
    ]),
    {
      foo: [
        { type: 'foo', value: 123 },
        { type: 'foo', value: 456 }
      ]
    }
  )

  /*t.deepEqual(
    into([], reduceBy(v => v.type), [
      { type: 'foo', value: 123 },
      { type: 'foo', value: 456 },
      { type: 'bar', value: 456 }
    ]),
    [
      [ 'foo', [
        { type: 'foo', value: 123 },
        { type: 'foo', value: 456 }
      ]],
      [ 'bar', [
        { type: 'bar', value: 456 }
      ]]
    ]
  )*/
  t.deepEqual(
    pipe(
      reduceBy(v => v.type),
      filter(([k, v]) => v.length > 1)
    )([
      { type: 'foo', value: 123 },
      { type: 'foo', value: 456 },
      { type: 'bar', value: 456 }
    ]),
    {
      foo: [
        { type: 'foo', value: 123 },
        { type: 'foo', value: 456 }
      ]
    }
  )

  t.end()
})
