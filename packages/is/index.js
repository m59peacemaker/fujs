import isNil from './nil'
import isRegExp  from './regexp'
import isString from './string'
import srslyNumber from './srsly-number'
import srslyObject from './srsly-object'

const is = {
  nil: isNil,
  regExp: isRegExp,
  string: isString,
  srslyNumber: srslyNumber,
  srslyObject: srslyObject
}

export default is

export {
  isNil,
  isRegExp,
  isString,
  srslyNumber,
  srslyObject,
}
