import reduceArray from './array'
import reduceIterable from './iterable'
import xfProps from '../transducer-utils/xf-props'

const reduceCore = (xfObj, initialValue, coll) => {
  const xfp = xfProps(xfObj)
  const reduceFn = Array.isArray(coll) ? reduceArray : reduceIterable
  const result = reduceFn(xfp.step, initialValue, coll)
  return xfp.result(result)
}

export default reduceCore
