import curryNCore from '@fujs/curry-n/core'
import SimpleTransducer from '../transducer-utils/simple-transducer'
import Helper from '../transducer-utils/helper'

const filtering = pred => nextStep => {
  return (result, input) => pred(input) ? nextStep(result, input) : result
}

const filter = curryNCore(2, (pred, subject) => {
  return Helper(SimpleTransducer(filtering(pred)), subject)
})

export default filter
