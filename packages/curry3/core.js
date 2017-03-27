import curry1Core from '../curry1/core'
import curry2Core from '../curry2/core'

const curry3Core = fn => {
  const curriedFn = function (a0, a1, a2, ...rest) {
    switch (arguments.length) {
      case 0: return curriedFn
      case 1: return curry2Core(
        function (_a1, _a2, ...r) { return fn.call(this, a0, _a1, _a2, ...r) }
      )
      case 2: return curry1Core(
        function (_a2, ...r) { return fn.call(this, a0, a1, _a2, ...r) }
      )
      default: return fn.call(this, a0, a1, a2, ...rest)
    }
  }
  return curriedFn
}

export default curry3Core
