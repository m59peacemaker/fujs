import unreduce from './unreduce'
import isReduced from './is-reduced'

const unreduced = x => isReduced(x) ? unreduce(x) : x

export default unreduced
