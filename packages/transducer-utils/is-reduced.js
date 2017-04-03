import protocol from 'transducer-protocol'

const isReduced = x => x && x[protocol.reduced]

export default isReduced
