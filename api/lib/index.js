const express = require('express')
const app = express()
const path = require('path')
const jwt = require('express-jwt')
const jwks = require('jwks-rsa')
const cors = require('cors')
const mongodb = require('mongodb')
const fs = require('fs')

const MongoClient = mongodb.MongoClient;

var connectionUrl = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST_PORT}/${process.env.MONGO_DB}?authMechanism=SCRAM-SHA-1&authSource=${process.env.MONGO_DB}`;

const mongoDbPromise = new Promise((resolve, reject) => {
    MongoClient.connect(connectionUrl, (err, db) => {
        err !== null ? reject(err) : resolve(db)
    })
})

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
    if(req.user.sub === 'google-oauth2|106496533429095347725'
      || req.user.sub === 'google-oauth2|100181074827094964607'
      || req.user.sub == 'google-oauth2|108748095257783010978') {
      next()
    } else {
      res.status(401).json({error: 'unknown user'});
    }
}

const errorHandler = function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error: 'unauthorized request'});
  }
}

const apiMiddleware = [jwtCheck, homeUsersCheck, errorHandler]

// /static /static/css/main.1d4c7900.css
app.use((req, res, next) => {
  if (req.url == '/') {
    res.sendFile(path.resolve(__dirname, '../../client/build/index.html'))
  } else if (!req.url.match(/\/api\/*/g)) {
    const filePath = req.url.replace('/', '../../client/build/')
    const file = path.resolve(__dirname, filePath)

    fs.access(file, (fs.constants || fs).R_OK, err => {
      err ? res.sendFile(path.resolve(__dirname, '../../client/build/index.html'))
        : res.sendFile(file);
    })
  } else {
    next()
  }
});

app.get('/api/last-reading', apiMiddleware, (req, res) => {
    mongoDbPromise.then(db => db.collection('readings').findOne({}, {
            sort: [['timestamp', -1]],
            fields: {
                _id: 0
            }
        }).then(
            reading => res.json(reading),
            err => res.status(500).json(error('Failed to get latest reading'))
        )
    )
})

const acHeatingCommand = c => {
    if (c === 'medium') {
        return 'ON_HEAT_24'
    } else if (c === 'high') {
        return 'ON_HEAT_26'
    }

    return 'UNKNOWN'
}

const sendCommand = command => {
    console.log(command)
    return mongoDbPromise.then(db => db.collection('commands').insertOne(command))
}

const commandSuccess = res => (r => res.status(201).json({ status: 'ok' }))
const commandError = res => (err => res.status(500).json(error('Failed to send the command')))

app.put('/api/heating/:value', apiMiddleware, (req, res) => {
    sendCommand({
            type : 'AC',
            data : acHeatingCommand(req.params.value)
        }).then(commandSuccess(res), commandError(res))
})

app.put('/api/cooling/on', apiMiddleware, (req, res) => {

    sendCommand({
            type : 'AC',
            data : 'ON_COOL'
        }).then(commandSuccess(res), commandError(res))
})

app.put('/api/ac/off', apiMiddleware, (req, res) => {

    sendCommand({
            type : 'AC',
            data : 'OFF'
        }).then(commandSuccess(res), commandError(res))
})

const ledCommand = (r, g, b) => ({
  type : 'LED',
  data : {
    r: r,
    g: g,
    b: b
  }
})

app.put('/api/led/r/:r/g/:g/b/:b', apiMiddleware, (req, res) => {
    sendCommand(ledCommand(req.params.r, req.params.g, req.params.b))
      .then(commandSuccess(res), commandError(res))
})

app.put('/api/led/off', apiMiddleware, (req, res) => {
    sendCommand(ledCommand(0, 0, 0)).then(commandSuccess(res), commandError(res))
})

app.listen(3003, function () {
  console.log('Example app listening on port 3003!')
})
