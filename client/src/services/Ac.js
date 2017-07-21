
const callApi = (url, accessToken) => fetch(url, {
  method: 'PUT',
  headers: new Headers({
    'Authorization': `Bearer ${accessToken}`
  })
})

const heatingMedium = accessToken => () => callApi('/api/heating/medium', accessToken)

const heatingHigh = accessToken => () => callApi('/api/heating/high', accessToken)

const coolingOn = accessToken => () => callApi('/api/cooling/on', accessToken)

const acOff = accessToken => () => callApi('/api/ac/off', accessToken)

export { heatingMedium, heatingHigh, coolingOn, acOff }
