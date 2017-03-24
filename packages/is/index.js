import isString from './string'
import isNumber from './number'
import isNil from './nil'
import isRegExp  from './regexp'

const is = {
  string: isString,
  number: isNumber,
  nil: isNil,
  regExp: isRegExp
}

export default is

export {
  isString,
  isNumber,
  isNil,
  isRegExp
}
