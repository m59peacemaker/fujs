'use strict'

import arityCore from '../arity/core'

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

const makeCurriedFn = (n, accumulatedArgs, fn) => {
  let cachedLength
  return function curriedFn () {
    const receivedEnoughArgs = arguments.length >= n

    if (receivedEnoughArgs && cachedLength === undefined) {
      cachedLength = accumulatedArgs.length
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
    return arityCore(nextArity, makeCurriedFn(nextArity, allArgs, fn))
  }
}

const curryNCore = (n, fn) => {
  return arityCore(n, makeCurriedFn(n, [], fn))
}

export default curryNCore
