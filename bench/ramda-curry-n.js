import Suite from './lib/suite'
import { curryN } from 'ramda'
import ngram from '../../ngram'
import range from '../packages/range'

Suite()
.add('R.curryN(4)', () => {
  var f = curryN(4)((a, b, c, d) => a + b + c + d + 1)
  var setsOfArgCombinations = ngram(range(0, 5), 1)
  setsOfArgCombinations.forEach(combinations => {
    combinations.forEach(args => f(...args))
  })
  var r = f(new Date(), 10)
})
.run()
