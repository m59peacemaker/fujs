import Suite from './lib/suite'
import curry1 from '../packages/curry1'
import ngram from '../../ngram'
import range from '../packages/range'

Suite()
.add('curry1', () => {
  var f = curry1(a => a + 1)
  var setsOfArgCombinations = ngram(range(0, 10), 1)
  setsOfArgCombinations.forEach(combinations => {
    combinations.forEach(args => f(...args))
  })
  var r = f(new Date())
})
.run()
