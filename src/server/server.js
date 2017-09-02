const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser');
//const helmet = require('helmet')
const patientApi = require('../api/patients')
const doctorApi = require('../api/doctors')

const start = (options) => {
  return new Promise((resolve, reject) => {
    if (!options.repo) {
      reject(new Error('The server must be started with a connected repository'))
    }
    if (!options.port) {
      reject(new Error('The server must be started with an available port'))
    }

    const app = express()
    app.use(morgan('dev'))
    app.use(bodyParser.json());
   // app.use(helmet())
    app.use((err, req, res, next) => {
      reject(new Error('Something went wrong!, err:' + err))
      res.status(500).send('Something went wrong!')
    })

    patientApi(app, options)
    doctorApi(app, options)
    const server = app.listen(options.port, () => resolve(server))
  })
}

module.exports = Object.assign({}, {start})