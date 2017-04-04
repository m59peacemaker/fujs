import curryNCore from '@fujs/curry-n/core'
import SimpleTransducer from '../transducer-utils/simple-transducer'
import Helper from '../transducer-utils/helper'

const mapping = f => nextStep => (result, input) => nextStep(result, f(input))

const map = curryNCore(2, (f, subject) => {
  return Helper(SimpleTransducer(mapping(f)), subject)
})

export default map
