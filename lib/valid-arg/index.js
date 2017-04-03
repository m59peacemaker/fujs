import validArgCore from './core'
import curryNCore from '../curry-n/core'
import isFunction from '../is/function'

const signature = 'validArg(signature, pred, argName, argValue)'

const validArg = curryNCore(4, (_signature, pred, _argName, _argValue) => {
  validArgCore(signature, isFunction, 'pred', pred)
  return validArgCore(_signature, pred, _argName, _argValue)
})

export default validArg
