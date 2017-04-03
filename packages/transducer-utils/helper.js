import into from '../into'
import empty from '../empty'
import isXf from './is-xf'

const Helper = (transducer, subject) => {
  if (isXf(subject) || typeof subject === 'function') {
    return transducer(subject)
  }
  return into(empty(subject), transducer, subject)
}

export default Helper
