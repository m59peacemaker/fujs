import arity from '@fujs/arity'
import condCore from './core'

const cond = pairs => {
  const lengths = pairs.map(pair => pair[0].length)
  const maxArity = lengths.reduce(max, 0)
  return arity(maxArity, condCore(pairs))
}

export default cond
