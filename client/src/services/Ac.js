import { callApi } from './Api'

const heatingMedium = accessToken => () => callApi('/api/heating/medium', accessToken)

const heatingHigh = accessToken => () => callApi('/api/heating/high', accessToken)

const coolingOn = accessToken => () => callApi('/api/cooling/on', accessToken)

const acOff = accessToken => () => callApi('/api/ac/off', accessToken)

export { heatingMedium, heatingHigh, coolingOn, acOff }
