import isSrslyObject from '../is-srsly-object'

const ITERATOR_SYMBOL = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator'

const toIterator = coll => {
  if (typeof coll.next === 'function' ) {
    return coll
  } else if (isSrslyObject(coll)) {
    coll = Object.entries(coll)
  }
  return coll[ITERATOR_SYMBOL]()
}

export default toIterator
