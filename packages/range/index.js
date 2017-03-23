import curry2 from '../curry2'
import _range from './_'

const range = curry2((from, to) => {
  if (!(typeof from === 'number' && typeof to === 'number')) {
    throw new TypeError('Both arguments to range must be numbers')
  }
  return _range(from, to)
})

export default range
