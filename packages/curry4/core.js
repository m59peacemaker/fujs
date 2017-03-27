import curry1Core from '../curry1/core'
import curry2Core from '../curry2/core'
import curry3Core from '../curry3/core'

const curry4Core = fn => {
  const curriedFn = function (a0, a1, a2, a3) {
    switch (arguments.length) {
      case 0: return curriedFn
      case 1: return curry3Core(function (_a1, _a2, _a3) { return fn(a0, _a1, _a2, _a3) })
      case 2: return curry2Core(function (_a2, _a3) { return fn(a0, a1, _a2, _a3) })
      case 3: return curry1Core(function (_a3) { return fn(a0, a1, a2, _a3) })
      case 4: return fn(a0, a1, a2, a3)
      default: return fn.apply(this, arguments)
    }
  }
  return curriedFn
}

export default curry4Core
