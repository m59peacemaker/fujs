import curryNCore from '@fujs/curry-n/core'

const isGt = curryNCore(2, (b, a) => a > b)

export default isGt
