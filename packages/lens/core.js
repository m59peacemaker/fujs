import map from '../map'

const lensCore = (getter, setter) => toFunctorFn => target => {
  return map(
    focus => setter(focus, target),
    toFunctorFn(getter(target))
  )
}

export default lensCore
