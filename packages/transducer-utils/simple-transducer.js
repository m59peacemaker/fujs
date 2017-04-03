import Xf from './xf'
import xfProps from './xf-props'

const SimpleTransducer = transducer => {
  return nextXf => {
    const next = xfProps(nextXf)
    const step = transducer(next.step)
    return Xf({init: next.init, result: next.result, step})
  }
}

export default SimpleTransducer
