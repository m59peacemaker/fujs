import Suite from './lib/suite'
import curry1Core from '../packages/curry1/core'
import ngram from '../../ngram'
import range from '../packages/range'

Suite()
.add('curry1Core', () => {
  var f = curry1Core(a => a + 1)
  var setsOfArgCombinations = ngram(range(0, 10), 1)
  setsOfArgCombinations.forEach(combinations => {
    combinations.forEach(args => f(...args))
  })
  var r = f(new Date())
})
.run()
