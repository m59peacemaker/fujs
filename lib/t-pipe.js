const tPipe = (...fns) => {
  return (coll) => into(empty(coll), compose(...fns), coll)
}
