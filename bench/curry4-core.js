import Suite from './lib/suite'
import curry4Core from '../packages/curry4/core'
import ngram from '../../ngram'
import range from '../packages/range'

Suite()
.add('curry4Core', () => {
  var f = curry4Core((a, b, c, d) => a + b + c + d + 1)
  var setsOfArgCombinations = ngram(range(0, 5), 1)
  setsOfArgCombinations.forEach(combinations => {
    combinations.forEach(args => f(...args))
  })
  var r = f(new Date(), 1, 2, 3)
})
.run()
