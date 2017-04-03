const arityMap = {}

const createArityFunction = n => {
  let placeHolders = n ? '_0' : ''
  for (let i = 1; i < n; ++i) {
    placeHolders += `, _${i}`
  }
  return new Function(
    'fn', `return function (${placeHolders}) { return fn.apply(this, arguments) }`
  )
}

for (let i = 0; i <= 4; ++i) {
  arityMap[i] = createArityFunction(i)
}

const arityCore = (n, fn) => {
  let arityFn = arityMap[n] || (arityMap[n] = createArityFunction(n))
  return arityFn(fn)
}

export default arityCore

export {
  arityMap
}
