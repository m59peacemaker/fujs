import curry2Core from '../curry2/core'
import arityCore from '../arity/core'
import validArg from '../valid-arg'
import isFunction from '../is/function'
import partialCore from './core'

const signature = 'partial(fn, args)'

const partial = curry2Core((fn, args) => {
  validArg(signature, 'fn', fn, isFunction)
  validArg(signature, 'args', args, Array.isArray)
  if (args.length === 0) { return fn }
  return arityCore(fn.length + args.length, partialCore(fn, args))
})

export default partial
