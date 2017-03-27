import curry1Core from '../curry1/core'

const curry2Core = fn => {
  const curriedFn = function (a0, a1) {
    switch (arguments.length) {
      case 0: return curriedFn
      case 1: return curry1Core(function (_a1) { return fn(a0, _a1) })
      case 2: return fn(a0, a1)
      default: return fn.apply(this, arguments)
    }
  }
  return curriedFn
}

export default curry2Core
