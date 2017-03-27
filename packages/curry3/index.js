import curry1Core from '../curry1/core'
import curry3Core from './core'

const curry3 = curry1Core(curry3Core)

export default curry3
