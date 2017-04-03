import protocol from 'transducer-protocol'

const isXf = v => typeof v[protocol.step] === 'function'

export default isXf
