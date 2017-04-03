import isReduced from '../transducer-utils/is-reduced'
import unreduce from '../transducer-utils/unreduced'

const reduceArray = (fn, acc, coll) => {
  let i = 0
  while (i < coll.length) {
    acc = fn(acc, coll[i])
    if (isReduced(acc)) {
      return unreduce(acc)
    }
    ++i
  }
  return acc
}

export default reduceArray
