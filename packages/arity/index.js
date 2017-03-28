import arityCore from './core'
import curryNCore from '../curry-n/core'
import validArg from '../valid-arg'
import isFunction from '../is/function'
import srslyNumber from '../is/srsly-number'

const signature = 'arity(n, fn)'
const arity = curryNCore(2, (n, fn) => {
  validArg(signature, isFunction, 'fn', fn)
  validArg(signature, srslyNumber, 'n', n)
  return arityCore(n, fn)
})

export default arity
