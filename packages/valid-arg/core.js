const validArg = (fnSignature, argName, argValue, pred) => {
  if (!pred(argValue)) {
    const b = v => `\x1b[1m${v}:\x1b[0m`
    const argType = typeof argValue
    try { argValue = JSON.stringify(argValue) } catch (err) {}
    let msg = [
      [undefined, `${fnSignature} "${argName}" value is invalid`],
      ['type', argType],
      ['value', argValue.toString().slice(0, 60)],
      ['predicate', pred]
    ]
    pred.name && msg.splice(3, 0, ['must satisfy', pred.name])
    msg = msg
      .map(v => (v[0] ? b(v[0]) + ' ' : '') + v[1]).join('\n')
      .split('\n')
      .map((v, i) => i ? '  ' + v : v)
      .join('\n') + '\n'
    throw new Error(msg)
  }
  return true
}

export default validArg
