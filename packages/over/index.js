import curryNCore from '@fujs/curry-n/core'
import overCore from './core'

const over = curryNCore(2, overCore)

export default over
