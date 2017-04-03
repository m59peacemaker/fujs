import protocol from 'transducer-protocol'

const unreduce = x => x[protocol.value]

export default unreduce
