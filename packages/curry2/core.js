import curry1Core from '../curry1/core'

const curry2Core = fn => {
  const curriedFn = function (a0, a1, ...rest) {
    switch (arguments.length) {
      case 0: return curriedFn
      case 1: return curry1Core(function (_a1, ...r) { return fn.call(this, a0, _a1, ...r) })
      default: return fn.call(this, a0, a1, ...rest)
    }
  }
  return curriedFn
}

export default curry2Core
