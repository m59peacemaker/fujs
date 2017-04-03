import isReduced from '../transducer-utils/is-reduced'
import unreduce from '../transducer-utils/unreduced'
import toIterator from '../transducer-utils/to-iterator'

const reduceIterable = (fn, acc, coll) => {
  const iterator = toIterator(coll)
  let step = iterator.next()
  while (!step.done) {
    acc = fn(acc, step.value)
    if (isReduced(acc)) {
      return unreduce(acc)
    }
    step = iterator.next()
  }
  return acc
}

export default reduceIterable
