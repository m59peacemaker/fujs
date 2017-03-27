import range from '../packages/range'
import validArg from '../packages/valid-arg'
import equivalent from '../packages/equivalent'
const signature = 'isCurried (fn, inputArgs, returnValue)'
const invokeWithEach = (args, fn) => args.reduce((acc, v) => acc(v), fn)

// doesn't work on functions that return functions since return value can't be equivalent
const isCurried = (fn, inputArgs, returnValue) => {
  validArg(signature, 'inputArgs', inputArgs, inputArgs => inputArgs.length >= fn.length)
  try {
    const x = range(0, fn.length).reduce((acc) => acc(), fn) //invoke with nothing fn.length times
    return equivalent(invokeWithEach(inputArgs, fn), returnValue)
  } catch (err) {}
  return false
}

export default isCurried
