import curryNCore from '../curry-n/core'

const slice = curryNCore(3, (fromIndex, toIndex, list) => list.slice(fromIndex, toIndex))

export default slice
