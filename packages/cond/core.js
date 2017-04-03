const condCore = pairs => () => {
  let idx = 0
  while (idx < pairs.length) {
    if (pairs[idx][0](...args)) {
      return pairs[idx][1](...args)
    }
    idx += 1
  }
}

export default condCore
