import curry1Core from '../curry1/core'
import curry2Core from './core'

const curry2 = curry1Core(curry2Core)

export default curry2
