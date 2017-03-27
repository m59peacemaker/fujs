const equivalentArray = (a, b) => {
  if (a.length !== b.length) {
    return false
  }
  for (var i = 0; i < a.length; ++i) {
    if (!equivalent(a[i], b[i])) {
      return false
    }
  }
  return true
}

const equivalentObject = (a, b) => {
  return equivalentArray(Object.keys(a), Object.keys(b)) &&
    equivalentArray(Object.values(a), Object.values(b))
}

const equivalent = (a, b) => {
  if (Object.is(a, b)) {
    return true
  } else if (Array.isArray(a) && Array.isArray(b)) {
    return equivalentArray(a, b)
  } else if (isObject(a) && isObject(b)) {
    return equivalentObject(a, b)
  }
  return false
}

export default equivalent

export {
  equivalentArray,
  equivalentObject
}
