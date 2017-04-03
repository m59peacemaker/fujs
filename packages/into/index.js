import curryNCore from '@fujs/curry-n/core'
import intoCore from './core'

const into = curryNCore(3, intoCore)

export default into
