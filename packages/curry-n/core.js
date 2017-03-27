import arityCore from '../arity/core'
import partialCore from '../partial/core'

const curryNCore = (n, fn) => {
  let f = function (...args) {
    if (args.length === 0) { return f }
    if (args.length < n) {
      return curryNCore(n - args.length, partialCore(fn, args))
    }
    return fn.apply(this, args)
  }
  f = arityCore(n, f)
  return f
}

export default curryNCore
