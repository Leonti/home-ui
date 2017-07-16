const express = require('express')
const app = express()
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors')
const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient;

var connectionUrl = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST_PORT}/${process.env.MONGO_DB}?authMechanism=SCRAM-SHA-1&authSource=${process.env.MONGO_DB}`;

const mongoDbPromise = new Promise((resolve, reject) => {
    MongoClient.connect(connectionUrl, (err, db) => {
        err !== null ? reject(err) : resolve(db)
    })
})

app.use(express.static('../client/build'))

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

const error = msg => { error: msg}
const errorHandler = function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json(error('Invalid Token'));
  }
}

app.use(cors(), jwtCheck, homeUsersCheck, errorHandler)

app.get('/api/last-reading', (req, res) => {
    mongoDbPromise.then(db => db.collection('readings').findOne({}, {
            sort: [['timestamp', -1]],
            fields: {
                _id: 0
            }
        }))
        .then(
            reading => res.json(reading),
            err => res.status(500).json(error('Failed to get latest reading'))
        )
})

app.listen(3003, function () {
  console.log('Example app listening on port 3003!')
})
