import SimpleTransducer from '../transducer-utils/simple-transducer'
import Xf from '../transducer-utils/xf'
import xfProps from '../transducer-utils/xf-props'
import reduceCore from '../reduce/core'
import curryNCore from '../curry-n/core'
import isXf from '../transducer-utils/is-xf'
import into from '../into'

const findGroupInArray = (key, coll) => {

}

const getKey = v => v.name
const getGroup = (key, coll) => {
  return coll[key] || (Array.isArray(coll) && coll.find(v => v[0] === key)) || []
}
const putIntoGroup = (value, group) => {
  group.push(value) // not really supposed to mutate, but it's ok here
  return group
}

// getKey = item => key
// groupValues = (group, item)

const reducingBy = getKey => nextStep => {
  const groups = {}
  return (acc, value) => {
    const key = getKey(value)
    const group = getGroup(key, acc)
    return nextStep(acc, [ key, putIntoGroup(value, group) ])
  }
}

const reduceBy = curryNCore(2, (getKey, subject) => {
  const transducer = SimpleTransducer(reducingBy(getKey))
  if (isXf(subject) || typeof subject === 'function') {
    return transducer(subject)
  }
  return into({}, transducer, subject)
})

export default reduceBy
