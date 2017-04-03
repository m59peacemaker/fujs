import protocol from 'transducer-protocol'

const Reduced = v => ({
  [protocol.reduced]: true,
  [protocol.value]: v
})

export default Reduced
