import curryNCore from '@fujs/curry-n/core'
import normalizeXf from '../transducer-utils/normalize-xf'
import reduceCore from './core'

const reduce = curryNCore(3, (xf, initialValue, coll) => {
  return reduceCore(normalizeXf(xf), initialValue, coll)
})

export default reduce
