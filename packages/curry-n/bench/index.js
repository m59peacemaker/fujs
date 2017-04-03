import Benchmark from 'benchmark'
import fastCurry from 'fast-curry'
import instantCurry from 'instant-curry'
import lodashCurry from 'lodash.curry'
import curryNCore from '../core'
import curryN from '../'
import curry from '../../curry'

// note that fast-curry and instant-curry are not fully operational curries (arity/context/restArgs)
// `fujs` curryN is the fastest, but create and lift are slowed down by `f.toString = `

const curry2Sets = [
  { name: 'curryNCore', fn: curryNCore.bind(undefined, 2) },
  { name: 'curryN', fn: curryN(2) },
  { name: 'curry', fn: curry },
  { name: 'lodash.curry', fn: lodashCurry },
  { name: 'fastCurry', fn: fastCurry },
  { name: 'instantCurry', fn: instantCurry }
]

const curry4Sets = [
  { name: 'curryNCore', fn: curryNCore.bind(undefined, 4) },
  { name: 'curryN', fn: curryN(4) },
  { name: 'curry', fn: curry },
  { name: 'lodash.curry', fn: lodashCurry },
  { name: 'fastCurry', fn: fastCurry },
  { name: 'instantCurry', fn: instantCurry }
]

const bench2 = () => {
  const suite = new Benchmark.Suite()

  let cfn
  let cfn1
  let result

  curry2Sets.forEach(({name, fn}) => {
    suite
      .add(`${name} create`, () => {
        cfn = fn(function (a, b) { return a + b })
      })
      .add(`${name} lift`, () => {
        cfn1 = cfn(1)
      })
      .add(`${name} call`, () => {
        result = cfn1(2)
      })
  })

  suite
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

const bench4 = () => {
  const suite = new Benchmark.Suite()

  let cfn
  let cfn3
  let cfn1
  let result

  curry4Sets.forEach(({name, fn}) => {
    suite
      .add(`${name} create`, () => {
        cfn = fn(function (a, b, c, d) { return a + b + c + d })
      })
      .add(`${name} lift`, () => {
        cfn3 = cfn(1)
      })
      .add(`${name} lift2`, () => {
        cfn1 = cfn3(2, 3)
      })
      .add(`${name} call`, () => {
        result = cfn1(4)
      })
  })

  suite
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

console.log('--- curry2 --- ')
bench2().on('complete', () => {
  console.log('--- curry 4 multiple partial application --- ')
  bench4()
})
