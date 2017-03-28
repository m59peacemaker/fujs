'use strict'

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

const arity = (length, fn) => {
  let arityFn = arityMap[length] || (arityMap[length] = createArityFunction(length))
  return arityFn(fn)
}


/*
 *  - "curried function / curriedFn": the function returned by `curryN(n, fn)`
 *  - "partially applied function": function returned by calling `curriedFn` with fewer arguments than `curriedFn.length` (n)
 *  - "CPF": a curried or partially applied function
 *
   // TODO: this should now refer to `cachedLength`, as I ditched `cacheArray`
 *  Using `cachedArray` improves final invocation performance by 700%. (seriously)
 *  Mutating in the while loop rather than [...accumulatedArgs, ....arguments]
 *    increases final invocation performance by 1000% (seriously)
 *  Assigning rather than pushing to array makes a 400% difference.
 *  On the invocation to the CPF that passes enough arguments to satisfy the curry,
 *    `cachedArray` is created and populated with all the arguments so far,
 *     then `cachedArray` is applied to `fn`.
 *  If the CPF is called again with enough arguments,
 *    `cachedArray` can be reused rather than creating a new array.
 *  The values of `cachedArray` will just be overwritten to match the new given arguments.
 */

const curryNCore = (n, accumulatedArgs, fn) => {
  let cachedLength
  return function curriedFn () {
    const receivedEnoughArgs = arguments.length >= n
    if (receivedEnoughArgs && cachedLength === undefined) {
      cachedLength = accumulatedArgs.length
      console.log(`setting cached length: ${cachedLength}`)
    }

    const accumulatedArgsLength = cachedLength === undefined ? accumulatedArgs.length : cachedLength

    const allArgs = receivedEnoughArgs ? accumulatedArgs : []

    const targetLength = arguments.length + accumulatedArgsLength

    let i = receivedEnoughArgs ? accumulatedArgsLength : 0

    while (i < targetLength) {
      if (i < accumulatedArgsLength) {
        allArgs[i] = accumulatedArgs[i]
      } else {
        allArgs[i] = arguments[i - accumulatedArgsLength]
      }
      ++i
    }

    if (receivedEnoughArgs) {
      if (allArgs.length > targetLength) {
        allArgs.length = targetLength // ditch extra cached items
      }
      return fn.apply(this, allArgs)
    }

    const nextArity = n - arguments.length
    return arity(nextArity, curryNCore(nextArity, allArgs, fn))
  }
}

/*
const curryNCore = (n, accumulatedArgs, fn) => {
  let cachedArray
  return function curriedFn () {
    const hasReceivedEnoughArgs = arguments.length >= n

    if (hasReceivedEnoughArgs) {
      cachedArray = cachedArray || []
    }

    const allArgs = hasReceivedEnoughArgs ? cachedArray : []

    // copy accumatedArgs and arguments into allArgs
    let i = 0
    const targetLength = arguments.length + accumulatedArgs.length
    while (i < targetLength) {
      if (i < accumulatedArgs.length) {
        allArgs[i] = accumulatedArgs[i]
      } else {
        allArgs[i] = arguments[i - accumulatedArgs.length]
      }
      ++i
    }

    if (hasReceivedEnoughArgs) {
      if (allArgs.length > targetLength) {
        allArgs.length = targetLength // ditch extra cached items
      }
      return fn.apply(this, allArgs)
    }

    const nextArity = n - arguments.length
    return arity(nextArity, curryNCore(nextArity, allArgs, fn))
  }
}*/

const curryN  = (n, fn) => {
  if (typeof fn !== 'function') {
      throw new TypeError("argument 1 must be an function")
  }
  if (!n) {
    throw new Error('"n" must be a number greater than 0')
  }
  return arity(n, curryNCore(n, [], fn))
}

export default curryN
