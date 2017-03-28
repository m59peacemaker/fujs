import Suite from './lib/suite'
import R from 'ramda'
import curryNCore from '../packages/curry-n/core'
import curry4 from '../packages/curry4'
import fastCurry from 'fast-curry'
import ngram from '../../ngram'
import range from '../packages/range'
import random from './lib/random'

const setsOfArgCombinations = ngram(range(0, 6), 1)
const fn = (a, b, c, d) => a + b + c + d + random()
let x

Suite()

.add('curry4', () => {
  const f = curryNCore(4, fn)
  x = setsOfArgCombinations.map(combinations => {
    return combinations.map(args => f(...args))
  })
})

.add('R.curry(4)', () => {
  const f = R.curryN(4, fn)
  x = setsOfArgCombinations.map(combinations => {
    return combinations.map(args => f(...args))
  })
})

.add('curryNCore(4)', () => {
  const f = curryNCore(4, fn)
  x = setsOfArgCombinations.map(combinations => {
    return combinations.map(args => f(...args))
  })
})

.add('fastCurry', () => {
  const f = fastCurry(fn)
  x = setsOfArgCombinations.map(combinations => {
    return combinations.map(args => f(...args))
  })
})

.run()
