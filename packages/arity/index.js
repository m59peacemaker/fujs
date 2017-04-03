import curryNCore from '@fujs/curry-n/core'
import arityCore from './core'

const arity = curryNCore(2, arityCore)

export default arity
