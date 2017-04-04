const lensCore = (get, set) => {
  return (nextLens) => {
    if (nextLens) {
      return {
        get: data => nextLens.get(get(data)),
        set: (v, data) => set(nextLens.set(v, get(data)), data)
      }
    }
    return { get, set }
  }
}

export default lensCore
