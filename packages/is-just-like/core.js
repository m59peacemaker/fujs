import isSrslyObject from '../is-srsly-object'

// TODO: compare dates and other stuff
const isJustLikeArray = (a, b) => {
  if (a.length !== b.length) {
    return false
  }
  for (var i = 0; i < a.length; ++i) {
    if (!isJustLike(a[i], b[i])) {
      return false
    }
  }
  return true
}

const isJustLikeObject = (a, b) => {
  return isJustLikeArray(Object.keys(a), Object.keys(b)) &&
    isJustLikeArray(Object.values(a), Object.values(b))
}

const isJustLike = (a, b) => {
  if (Object.is(a, b)) {
    return true
  } else if (Array.isArray(a) && Array.isArray(b)) {
    return isJustLikeArray(a, b)
  } else if (isSrslyObject(a) && isSrslyObject(b)) {
    return isJustLikeObject(a, b)
  }
  return false
}

export default isJustLike

export {
  isJustLikeArray,
  isJustLikeObject
}
