/*
  transformation / transducerCreator (...args)
  transducer (nextTransformer)
  transformer ({init, result, init }) | stepFn / transformingFn / iteratingFn, reducingFn (result, input)

  init: () => initialValueForResult
  result: (finalValue) => transformedFinalValue
  step: (result, input) => resultOfNextStep or Reduced (ordinary value or type Reduced)
 */
