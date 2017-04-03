import Benchmark from 'benchmark'
import test from 'tape'
import RamdaReduce from 'ramda/src/reduce'
import tdot from 'transducers.js'
import tjs from 'transducers-js'
import fujsReduce from '../'
import range from '../../range'
import normalizeXf from '../../transducer-utils/normalize-xf'

import fujsMap from '../../map'
import fujsFilter from '../../filter'
import compose from '../../compose'
import into from '../../into'
import pipe from '../../pipe'
import R from 'ramda'

const testArray = range(0, 100).map(v => 1)
const nextStep = (acc, v) => acc + v
const xf = normalizeXf((acc, v) => nextStep(acc, v))

const reduceMap = (fn, array) => {
  return array.reduce((acc, v) => {
    acc.push(fn(v))
    return acc
  }, [])
}
const inc = v => v + 1

const testArray2 = range(0, 100)
const isEven = v => v % 2 === 0

const fujsB = () => pipe(
  fujsMap(inc),
  fujsFilter(isEven)
)(testArray2)

const arrayB = () => testArray2
  .map(inc)
  .filter(isEven)

const RamdaB = () => R.pipe(
  R.map(R.inc),
  R.filter(isEven)
)(testArray2)

test('transformations', t => {
  t.deepEqual(
    fujsB(),
    arrayB()
  )
  t.deepEqual(
    fujsB(),
    RamdaB()
  )
  t.end()
})

const arrayMapB = () => testArray.map(inc).reduce(nextStep, 0)
const reduceMapB = () => reduceMap(inc, testArray).reduce(nextStep, 0)
const fujsReduceXfB = () => fujsReduce(xf, 0, testArray)
const fujsReduceFnB = () => fujsReduce(nextStep, 0, testArray)
const RamdaReduceXfB = () => RamdaReduce(xf, 0, testArray)
const RamdaReduceFnB = () => RamdaReduce(nextStep, 0, testArray)
const arrayReduceB = () => testArray.reduce(nextStep, 0)
const tjsReduceB = () => tjs.reduce(nextStep, 0, testArray)
const tdotReduceB = () => tdot.reduce(testArray, xf, 0)

test('bench fns are valid', t => {
  t.equal(arrayMapB(), 200, 'arrayMapB')
  t.equal(reduceMapB(), 200, 'reduceMapB')
  t.equal(fujsReduceXfB(), 100, 'fujsReduceXfB')
  t.equal(fujsReduceFnB(), 100, 'fujsReduceFnB')
  t.equal(RamdaReduceXfB(), 100, 'RamdaReduceXfB')
  t.equal(RamdaReduceFnB(), 100, 'RamdaReduceFnB')
  t.equal(arrayReduceB(), 100, 'arrayReduceB')
  t.equal(tjsReduceB(), 100, 'tjsReduceB')
  t.equal(tdotReduceB(), 100, 'tdotReduceB')
  t.end()
})

const bench = () => {
  const suite = new Benchmark.Suite()

  let result = 0

  suite
    /*.add(`fujs transformations`, () => {
      result += fujsB()
    })
    .add(`[] transformations`, () => {
      result += arrayB()
    })
    .add(`Ramda transformations`, () => {
      result += RamdaB()
    })*/
    .add(`fujs reduce w/ xf`, () => {
      result += fujsReduceXfB()
    })
    .add(`ramda reduce /w xf`, () => {
      result += RamdaReduceXfB()
    })
    .add(`fujs reduce w/ fn`, () => {
      result += fujsReduceFnB()
    })
    .add(`ramda reduce /w fn`, () => {
      result += RamdaReduceFnB()
    })
    .add(`[].reduce`, () => {
      result += arrayReduceB()
    })
    .add(`transducers-js reduce`, () => {
      result += tjsReduceB()
    })
    .add(`transducers.js reduce`, () => {
      result += tdotReduceB()
    })
    // amazingly, [].map is over twice as slow as [].reduce with the same logic!
    // https://jsperf.com/map-vs-reduce1/1
    .add('[].map', () => {
      result += arrayMapB()
    })
    .add('[].reduce map', () => {
      result += reduceMapB()
    })

    .on('error', err => {
      console.log(err)
      process.exit()
    })
    .on('cycle', event => {
      console.log(String(event.target))
    })
    .run({ async: true })
  return suite
}

bench()
