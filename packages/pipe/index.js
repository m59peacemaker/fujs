const pipe2 = (f, g) => (...args) => g(f(...args))
const pipe = (...fns) => fns.reduce(pipe2)

export default pipe

export {
  pipe2
}
