import identityCore from './core'
import curry1 from '../curry1'

const identity = curry1(identityCore)

export default identity
