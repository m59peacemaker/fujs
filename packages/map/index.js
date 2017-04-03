import curryNCore from '../curry-n/core'
import SimpleTransducer from '../transducer-utils/simple-transducer'
import isXf from '../transducer-utils/is-xf'
import into from '../into'
import empty from '../empty'

const mapping = f => nextStep => (result, input) => nextStep(result, f(input))

const map = curryNCore(2, (f, xfOrColl) => {
  const transducer = SimpleTransducer(mapping(f))
  if (isXf(xfOrColl) || typeof xfOrColl === 'function') {
    return transducer(xfOrColl)
  }
  return into(empty(xfOrColl), transducer, xfOrColl)
})

export default map
