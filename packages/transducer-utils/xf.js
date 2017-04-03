import protocol from 'transducer-protocol'
const identity = v => v
const noInit = () => { throw new Error('init not implemented') }

const Xf = ({init, result, step}) => ({
  [protocol.init]: init || noInit,
  [protocol.result]: result || identity,
  [protocol.step]: step
})

export default Xf
