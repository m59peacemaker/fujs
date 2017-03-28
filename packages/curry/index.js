import curryNCore from '../curry-n/core'
import validArg from '../valid-arg'
import isFunction from '../is/function'

const signature = 'curry(fn)'
const curry = fn => {
  validArg(signature, isFunction, 'fn', fn)
  return curryNCore(fn.length, fn)
}

export default curry
