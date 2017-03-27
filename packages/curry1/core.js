const curry1Core = function (fn) {
  const curriedFn = function (a0) {
    switch (arguments.length) {
      case 0: return curriedFn
      case 1: return fn(a0)
      default: return fn.apply(this, arguments)
    }
  }
  return curriedFn
}

export default curry1Core
