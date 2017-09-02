'use strict'
const status = require('http-status')

module.exports = (app, options) => {
  const {repo} = options

  app.get('/doctor', (req, res, next) => {
    repo.getAllDoctors().then(doctors => {
      res.status(status.OK).json(doctors)
    }).catch(next)
  })

  app.get('/doctor/:userId', (req, res, next) => {
    repo.getDoctorsByUserId(req.params.userId).then(doctor => {
      res.status(status.OK).json(doctor)
    }).catch(next)
  })

   app.post('/doctor', (req, res, next) => {
     repo.addDoctor(req.body).then(doctor => {
      res.status(status.OK).json(doctor)
    }).catch(next)
  })

  app.put('/doctor/:userId', (req, res, next) => {
    repo.updateDoctor(req.params.userId,req.body).then(doctor => {
      res.status(status.OK).json(doctor)
    }).catch(next)
  })

  app.delete('/doctor/:userId',(req, res, next) => {
    repo.deleteDoctor(req.params.userId).then(doctor => {
      res.status(status.OK).json("deleted doctor successfully")
    }).catch(next)
  })

}