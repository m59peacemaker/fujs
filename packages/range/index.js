import curryNCore from '@fujs/curry-n/core'
import rangeCore from './core'

const range = curryNCore(2, rangeCore)

export default range
