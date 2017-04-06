import Helper from '../transducer-utils/helper'
import SimpleTransducer from '../transducer-utils/simple-transducer'
import Reduced from '../transducer-utils/reduced'
import isReduced from '../transducer-utils/is-reduced'
import reduce from '@fujs/reduce'
import has from '../has/core'

// TODO: is this ever useful anywhere else to warrant making it its own thing?
const preservingReduced = nextStep => (acc, v) => {
  const result = nextStep(acc, v)
  return isReduced(result) ? Reduced(result) : result
}

// collection of collections into one collection
// i.e. merge or concat
const catting = nextStep => {
  return (acc, v) => {
    return reduce(preservingReduced(nextStep), acc, v)
  }
}

// add pairs to acc, when key exists in acc, call fn to determine value
const associngWith = f => nextStep => {
  return (acc, pair) => {
    const [ k, v ] = pair
    pair = has(acc, k) ? [ k, f(k, acc[k], v) ] : pair
    return nextStep(acc, pair)
  }
}

const cattingWithKey = f => nextStep => {
  const assocWith = associngWith(f)(nextStep)
  return catting(assocWith)
}

const cattingWith = f => nextStep => {
  return cattingWithKey((k, a, b) => f(a, b))(nextStep)
}

const cat = SimpleTransducer(catting)
const catWith = f => SimpleTransducer(cattingWith(f))
const catWithKey = f => SimpleTransducer(cattingWithKey(f))

export default cat
