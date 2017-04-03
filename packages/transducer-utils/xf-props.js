import protocol from 'transducer-protocol'

const xfProps = xf => ({
  init: xf[protocol.init],
  result: xf[protocol.result],
  step: xf[protocol.step]
})

export default xfProps
