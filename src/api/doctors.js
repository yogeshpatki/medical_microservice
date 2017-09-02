'use strict'
const status = require('http-status')

module.exports = (app, options) => {
  const {repo} = options

  app.get('/doctor', (req, res, next) => {
    repo.getAllDoctors().then(patients => {
      res.status(status.OK).json(patients)
    }).catch(next)
  })

  app.get('/doctor/:userId', (req, res, next) => {
    repo.getDoctorsByUserId(req.params.userId).then(patient => {
      res.status(status.OK).json(patient)
    }).catch(next)
  })

   app.post('/doctor', (req, res, next) => {
     repo.addDoctor(req.body).then(patient => {
      res.status(status.OK).json(patient)
    }).catch(next)
  })

  app.put('/doctor/:userId', (req, res, next) => {
    repo.updateDoctor(req.params.userId,req.body).then(patient => {
      res.status(status.OK).json(patient)
    }).catch(next)
  })

  app.delete('/doctor/:userId',(req, res, next) => {
    repo.deleteDoctor(req.params.userId).then(patient => {
      res.status(status.OK).json("deleted patient successfully")
    }).catch(next)
  })

}