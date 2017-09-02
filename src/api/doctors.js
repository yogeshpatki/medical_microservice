'use strict'
const status = require('http-status')

module.exports = (app, options) => {
  const {repo} = options

  app.get('/doctor', (req, res, next) => {
    //implement here
  })

  app.get('/doctor/:userId', (req, res, next) => {
    
  })

   app.post('/doctor', (req, res, next) => {
     
  })

  app.put('/doctor/:userId', (req, res, next) => {
    
  })

  app.delete('/doctor/:userId',(req, res, next) => {

  })

}