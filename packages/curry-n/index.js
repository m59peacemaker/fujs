import curryNCore from './core'
import validArg from '../valid-arg'
import isFunction from '../is/function'
import isGt from '../is-gt'

const isGt0 = isGt(0)

const signature = 'curryN(n, fn)'
const curryN = curryNCore(2, (n, fn) => {
  validArg(signature, isFunction, 'fn', fn)
  // TODO: maybe allow 0 - return 0 arity function
  validArg(signature, isGt0, 'n', n)
  return curryNCore(n, fn)
})

export default curryN
