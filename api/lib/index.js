const express = require('express')
const app = express()
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://leonti.au.auth0.com/.well-known/jwks.json"
    }),
    audience: 'home-api',
    issuer: "https://leonti.au.auth0.com/",
    algorithms: ['RS256']
})

const homeUsersCheck = (req, res, next) => {
    console.log(req.user.sub)
    console.log(req.headers.authorization)
    next()
}

app.use(jwtCheck, homeUsersCheck)
//app.use(homeUsersCheck)

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/api/stats', (req, res) => {
  res.send('Hello World!')
})

app.listen(3003, function () {
  console.log('Example app listening on port 3003!')
})
