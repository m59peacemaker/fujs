/*
  transformation / transducerCreator (...args)
  transducer (nextTransformer)
  transformer ({init, result, init }) | stepFn / transformingFn / iteratingFn, reducingFn (result, input)

  init: () => initialValueForResult
  result: (finalValue) => transformedFinalValue
  step: (result, input) => resultOfNextStep or Reduced (ordinary value or type Reduced)
 */


import protocol from 'transducer-protocol'
import srslyObject from '../is/srsly-object'
import curryNCore from '../curry-n/core'

const preservingReduced = nextStep => (acc, v) => {
  const result = nextStep(acc, v)
  return isReduced(result) ? Reduced(result) : result
}

const flatten = SimpleTransducer(nextStep => {
  return (result, input) => reduce(preservingReduced(nextStep), result, input)
})

export {
  transduce,
  into,
  reduce,
  compose,
  map,
  filter,
  flatten,
  Xf,
  Reduced,
  xfProps,
  normalizeXf,
  isXf,
  isReduced,
  unreduced,
  deref
}
