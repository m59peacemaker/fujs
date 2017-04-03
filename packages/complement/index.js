const complement = pred => {
  return (...args) => !pred(...args)
}

export default complement
