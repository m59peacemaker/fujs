import range from '../packages/range'
import isJustLike from '../packages/is-just-like'
const invokeWithEach = (args, fn) => args.reduce((acc, v) => acc(v), fn)

// doesn't work on functions that return functions since return value can't be equivalent
const isCurried = (fn, inputArgs, returnValue) => {
  try {
    const x = range(0, fn.length).reduce((acc) => acc(), fn) //invoke with nothing fn.length times
    return isJustLike(invokeWithEach(inputArgs, fn), returnValue)
  } catch (err) {
    console.log(err)
  }
  return false
}

export default isCurried
