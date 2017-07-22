const callApi = (url, accessToken) => fetch(url, {
  method: 'PUT',
  headers: new Headers({
    'Authorization': `Bearer ${accessToken}`
  })
})

export { callApi }
