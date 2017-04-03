import curryNCore from '@fujs/curry-n/core'
import normalizeXf from '../transducer-utils/normalize-xf'
import transduceCore from './core'

const transduce = curryNCore(4, (builderXf, initialValue, transducer, coll) => {
  return transduceCore(normalizeXf(builderXf), initialValue, transducer, coll)
})

export default transduce
