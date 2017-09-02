'use strict'

const repository = (db) => {
  const patients_collection = db.collection('patients')

  const getAllPatients = () => {
    return new Promise((resolve, reject) => {
      const patients = []
      const cursor = patients_collection.find({}, {title: 1, id: 1})
      const addPatient = (patient) => {
        patients.push(patient)
      }
      const sendPatients = (err) => {
        if (err) {
          reject(new Error('An error occured fetching all patients, err:' + err))
        }
        resolve(patients.slice())
      }
      cursor.forEach(addPatient, sendPatients)
    })
  }

  const getPatientByUserId = (userId) => {
    return new Promise((resolve, reject) => {
      const sendPatient = (err, patient) => {
        if (err) {
          reject(new Error(`An error occured fetching a patient with id: ${userId}, err: ${err}`))
        }
        resolve(patient)
      }
      patients_collection.findOne({userId: userId}, sendPatient)
    })
  }

  const disconnect = () => {
    db.close()
  }

  return Object.create({
    getAllPatients,
    getPatientByUserId,
    disconnect
  })
}

const connect = (connection) => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error('connection db not supplied!'))
    }
    resolve(repository(connection))
  })
}

module.exports = Object.assign({}, {connect})