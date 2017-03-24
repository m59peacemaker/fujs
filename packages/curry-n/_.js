import arity from '../arity/_'
import partial from '../partial/_'

const curryN = (n, fn) => {
  const f = function (...args) {
    if (args.length < n) {
      return curryN(n - args.length, partial(fn, args))
    }
    return fn.apply(this, args)
  }
  return arity(n, f)
}

export default curryN
