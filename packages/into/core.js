import transduceCore from '@fujs/transduce/core'
import isXf from '../transducer-utils/is-xf'
import Xf from '../transducer-utils/xf'
import PrimitiveXf from '../transducer-utils/primitive-xf'
import xfProps from '../transducer-utils/xf-props'

const sinkToXf = sink => {
  if (isXf(sink)) {
   return sink
  } else if (typeof sink === 'function') {
    return Xf({
      init: () => {},
      step: sink
    })
  }
  return PrimitiveXf(sink)
}

// sink can be transformer obj/fn or js primitive
const intoCore = (sink, transducer, coll) => {
  const builderXf = sinkToXf(sink)
  return transduceCore(builderXf, xfProps(builderXf).init(), transducer, coll)
}

export default intoCore
