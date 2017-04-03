import Xf from '../transducer-utils/xf'
import isSrslyObject from '../is-srsly-object'

const stringAppend = (acc, v) => acc + v

const arrayPush = (acc, v) => {
  acc.push(v)
  return acc
}

const objectSet = (acc, v) => {
  if (Array.isArray(v)) {
    acc[v[0]] = v[1]
  } else {
    acc[v] = null
  }
  return acc
}

const PrimitiveXf = value => {
  let initialValue
  let builder
  if (Array.isArray(value)) {
    initialValue = value.slice(0)
    builder = arrayPush
  } else if (isSrslyObject(value)) {
    initialValue = Object.assign({}, value)
    builder = objectSet
  } else if (typeof value === 'string') {
    initialValue = value
    builder = stringAppend
  } else {
    throw new Error(`cannot make a transformer for ${value}`)
  }
  return Xf({
    init: () => initialValue,
    step: builder
  })
}

export default PrimitiveXf
