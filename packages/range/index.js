import curry2 from '../curry2'
import rangeCore from './core'

const range = curry2((from, to) => {
  if (!(typeof from === 'number' && typeof to === 'number')) {
    throw new TypeError('Both arguments to range must be numbers')
  }
  return rangeCore(from, to)
})

export default range
