import Suite from './lib/suite'
import curry2Core from '../packages/curry2/core'
import ngram from '../../ngram'
import range from '../packages/range'

Suite()
.add('curry2Core', () => {
  var f = curry2Core((a, b) => a + b + 1)
  var setsOfArgCombinations = ngram(range(0, 5), 1)
  setsOfArgCombinations.forEach(combinations => {
    combinations.forEach(args => f(...args))
  })
  var r = f(new Date(), 10)
})
.run()
