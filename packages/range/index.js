import curryNCore from '../curry-n/core'
import rangeCore from './core'

const range = curryNCore(2, (from, to) => {
  if (!(typeof from === 'number' && typeof to === 'number')) {
    throw new TypeError('Both arguments to range must be numbers')
  }
  return rangeCore(from, to)
})

export default range
