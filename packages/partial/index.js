import curryNCore from '../curry-n/core'
import arityCore from '../arity/core'
import partialCore from './core'

const partial = curryNCore(2, (fn, args) => {
  if (args.length === 0) { return fn }
  return arityCore(fn.length + args.length, partialCore(fn, args))
})

export default partial
