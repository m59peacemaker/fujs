import curryNCore from '../curry-n/core'
import arityCore from '../arity/core'
import validArg from '../valid-arg'
import isFunction from '../is/function'
import partialCore from './core'

const signature = 'partial(fn, args)'

const partial = curryNCore(2, (fn, args) => {
  validArg(signature, isFunction, 'fn', fn)
  validArg(signature, Array.isArray, 'args', args)
  if (args.length === 0) { return fn }
  return arityCore(fn.length + args.length, partialCore(fn, args))
})

export default partial
