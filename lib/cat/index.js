import Helper from '../transducer-utils/helper'
import SimpleTransducer from '../transducer-utils/simple-transducer'
import Reduced from '../transducer-utils/reduced'
import isReduced from '../transducer-utils/is-reduced'
import reduce from '@fujs/reduce'

// TODO: is this ever useful anywhere else to warrant making it its own thing?
const preservingReduced = nextStep => (acc, v) => {
  const result = nextStep(acc, v)
  return isReduced(result) ? Reduced(result) : result
}

const catting = nextStep => {
  return (result, input) => {
    return reduce(preservingReduced(nextStep), result, input)
  }
}

const cat = subject => Helper(SimpleTransducer(catting), subject)

export default cat
