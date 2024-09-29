require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

//Routes
// const countryRoute = require('./src/api/routes/country.route')
// const stateRoute = require('./src/api/routes/state.route')
// const userRoute = require('./src/api/routes/user.route')
const v1Routes = require('./api')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/upload', express.static('upload'))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE')
    return res.status(200).json({})
  }
  next()
})
app.use('/api', v1Routes)
// app.use('/api/v1/country', countryRoute)
// app.use('/api/v1/state', stateRoute)
// app.use('/api/v1/state', userRoute)

//
app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    message: error.message,
  })
})

module.exports = app
