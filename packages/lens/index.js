import curryNCore from '@fujs/curry-n/core'
import lensCore from './core'

const lens = curryNCore(2, lensCore)

export default lens
