const overCore = (lens, fn, data) => {
  lens = lens()
  const newValue = fn(lens.get(data))
  return lens.set(newValue, data)
}

export default overCore
