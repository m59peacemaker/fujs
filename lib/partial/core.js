const partialCore = (fn, args) => {
  return function (...args2) {
    return fn.call(this, ...args, ...args2)
  }
}

export default partialCore
