import Benchmark from 'benchmark'
import test from 'tape'

import isReduced from '../../transducer-utils/is-reduced'
import unreduce from '../../transducer-utils/unreduced'

const a = (fn, acc, coll) => {
  let i = 0
  let len = coll.length
  while (i < len) {
    acc = fn(acc, coll[i])
    if (isReduced(acc)) {
      return unreduce(acc)
    }
    i = i + 1
  }
  return acc
}

const b = (fn, acc, coll) => {
  let i = 0
  while (i < coll.length) {
    acc = fn(acc, coll[i])
    if (isReduced(acc)) {
      return unreduce(acc)
    }
    i = i + 1
  }
  return acc
}

const add = (a, b) => a + b

const A = () => a(add, 0, [ 0, 1, 2, 3, 4 ])
const B = () => b(add, 0, [ 0, 1, 2, 3, 4 ])

const bench = () => {
  const suite = new Benchmark.Suite()

  let result = 0

  suite
    .add('b', () => {
      result += B()
    })
    .add('a', () => {
      result += A()
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
