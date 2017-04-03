import srslyObject from '@fujs/is-srsly-object'

const empty = v => {
  if (Array.isArray(v)) {
    return []
  } else if (srslyObject(v)) {
    return {}
  } else if (typeof v === 'string') {
    return ''
  }
  return undefined
}

export default empty
