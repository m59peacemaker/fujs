import curryNCore from '@fujs/curry-n/core'
import maxCore from './core'

const max = curryNCore(2, maxCore)

export default max
