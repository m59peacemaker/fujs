// TODO: should this mutate or return a wrapper with length set?
const setLength = (length, object) => {
  Object.defineProperty(object, 'length', {get: function () { return length }})
  return object
}

const arity = (n, fn) => {
  switch (n) {
    case 0: return function () { return fn.apply(this, arguments) }
    case 1: return function (a0) { return fn.apply(this, arguments) }
    case 2: return function (a0, a1) { return fn.apply(this, arguments) }
    case 3: return function (a0, a1, a2) { return fn.apply(this, arguments) }
    case 4: return function (a0, a1, a2, a3) { return fn.apply(this, arguments) }
    case 5: return function (a0, a1, a2, a3, a4) { return fn.apply(this, arguments) }
    default: return setLength(n, fn)
  }
}

export default arity
