'use strict'

import arityCore from '@fujs/arity/core'

/*
  "curried function / curriedFn": the function returned by `curryN(n, fn)`
  "partially applied function": function returned by calling `curriedFn` with fewer arguments than `curriedFn.length` (n)
  "CPF": a curried or partially applied function

  Using `cachedLength` improves final invocation performance by 700%. (seriously)
  Mutating in the while loop rather than [...accumulatedArgs, ....arguments]
    increases final invocation performance by 1000% (seriously)
  Assigning rather than pushing to array makes a 400% difference.
  On the invocation to the CPF that passes enough arguments to satisfy the curry,
    `cachedLength` stores the length of all the arguments accumulated prior to the current call,
    then the new arguments are mutated onto the existing accumulatedArgs array
  `cachedLength` lets future calls to the fn know where to mutate the new arguments into the existing array
  The values of `cachedArray` will just be overwritten to match the new given arguments.
  `f.toString = ` reduces performance by 600 - 900% o_O
 */

const makeCurriedFn = (n, accumulatedArgs, fn) => {
  let cachedLength
  const f  = function (...args) {
    const receivedEnoughArgs = args.length >= n

    if (receivedEnoughArgs && cachedLength === undefined) {
      cachedLength = accumulatedArgs.length
    }

    const accumulatedArgsLength = cachedLength === undefined ? accumulatedArgs.length : cachedLength

    const allArgs = receivedEnoughArgs ? accumulatedArgs : []

    const targetLength = args.length + accumulatedArgsLength

    let i = receivedEnoughArgs ? accumulatedArgsLength : 0

    while (i < targetLength) {
      if (i < accumulatedArgsLength) {
        allArgs[i] = accumulatedArgs[i]
      } else {
        allArgs[i] = args[i - accumulatedArgsLength]
      }
      ++i
    }

    if (receivedEnoughArgs) {
      if (allArgs.length > targetLength) {
        allArgs.length = targetLength // ditch extra cached items
      }
      return fn.apply(this, allArgs)
    }

    const nextArity = n - args.length
    return arityCore(nextArity, makeCurriedFn(nextArity, allArgs, fn))
  }
  f.toString = () => `${fn.name ? fn.name : fn.toString()}(${accumulatedArgs.join(', ')})`
  return f
}

const curryNCore = (n, fn) => {
  const f = arityCore(n, makeCurriedFn(n, [], fn))
  f.toString = () => fn.name ? fn.name : fn.toString()
  return f
}

export default curryNCore
