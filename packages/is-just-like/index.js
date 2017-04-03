import curryNCore from '../curry-n/core'
import isJustLikeCore from './core'

const isJustLike = curryNCore(2, isJustLikeCore)

export default isJustLike
