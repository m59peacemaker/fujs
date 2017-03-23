const partial = (fn, args) => {
  return function (...args2) {
    // TODO: would this be better as fn.call(this, ...args, ...args2) ?
    return fn.apply(this, [...args, ...args2])
  }
}

export default partial
