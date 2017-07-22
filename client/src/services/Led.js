import { callApi } from './Api'

const ledOn = accessToken => (r, g, b) => callApi(`/api/led/r/${r}/g/${g}/b/${b}`, accessToken)
const ledOff = accessToken => () => callApi('/api/led/off', accessToken)

export { ledOn, ledOff }
