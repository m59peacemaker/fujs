import reduceCore from '@fujs/reduce/core'

// transducer - function that takes a transformer and returns a transformer
// transformer - Xf({init, result, step}) | stepFn
// builderXf - transformer that belongs at the end of the transducer line - stepFn returns new accumulated value
const transduceCore = (builderXf, initialValue, transducer, coll) => {
  const transformer = transducer(builderXf)
  return reduceCore(transformer, initialValue, coll)
}

export default transduceCore
