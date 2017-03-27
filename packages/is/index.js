import isNil from './nil'
import isRegExp  from './regexp'
import isFunction from './function'
import isString from './string'
import srslyNumber from './srsly-number'
import srslyObject from './srsly-object'

const is = {
  nil: isNil,
  regExp: isRegExp,
  function: isFunction,
  string: isString,
  srslyNumber: srslyNumber,
  srslyObject: srslyObject
}

export default is

export {
  isNil,
  isRegExp,
  isFunction,
  isString,
  srslyNumber,
  srslyObject,
}
