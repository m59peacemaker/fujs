import Xf from './xf'

const normalizeXf = xf => typeof xf === 'function' ? Xf({step: xf}) : xf

export default normalizeXf
