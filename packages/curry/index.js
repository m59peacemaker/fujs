import curryNCore from '@fujs/curry-n/core'

const curry = fn => {
  return curryNCore(fn.length, fn)
}

export default curry
