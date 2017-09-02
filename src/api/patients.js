'use strict'
const status = require('http-status')

module.exports = (app, options) => {
  const {repo} = options

  app.get('/patients', (req, res, next) => {
    repo.getAllPatients().then(patients => {
      res.status(status.OK).json(patients)
    }).catch(next)
  })

  app.get('/patients/:userId', (req, res, next) => {
    repo.getPatientByUserId(req.params.userId).then(patient => {
      res.status(status.OK).json(patient)
    }).catch(next)
  })

   app.post('/patients', (req, res, next) => {
     console.log(req.body);
    repo.addPatient(req.body).then(patient => {
      res.status(status.OK).json(patient)
    }).catch(next)
  })

  app.put('/patients/:userId', (req, res, next) => {
     console.log(req.body);
    repo.updatePatient(req.params.userId,req.body).then(patient => {
      res.status(status.OK).json(patient)
    }).catch(next)
  })
}