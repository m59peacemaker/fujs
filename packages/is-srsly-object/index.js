// check by toString because of regex and custom types that are JS objects but don't behave like it
// typeof Immutable.List() === 'object'
// Immutable.List().toString() === 'List []'
const isSrslyObject = v => !Array.isArray(v)
  && v != null
  && Object.prototype.toString.call(v) === '[object Object]'

export default isSrslyObject
