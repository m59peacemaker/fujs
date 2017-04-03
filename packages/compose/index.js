import pipe from '@fujs/pipe'

const compose = (...fns) => pipe(...fns.reverse())

export default compose
