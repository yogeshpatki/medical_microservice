'use strict'

const repository = (db) => {
  const patients_collection = db.collection('patients')
  const doctors_collection = db.collection('doctors')

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

  const getAllDoctors = () => {
    return new Promise((resolve, reject) => {
      const doctors = []
      const cursor = doctors_collection.find({}, {title: 1, id: 1})
      const addDoctor = (doctor) => {
        doctors.push(doctors)
      }
      const senddoctors = (err) => {
        if (err) {
          reject(new Error('An error occured fetching all doctors, err:' + err))
        }
        resolve(doctors.slice())
      }
      cursor.forEach(addDoctor, senddoctors)
    })
  }

  const getPatientByUserId = (userId) => {
    return getUserById(userId,patients_collection);
  }

  const getDoctorsByUserId = (userId) => {
    return getUserById(userId,doctors_collection);
  }

  const getUserById = (userId,collection)=>{
    return new Promise((resolve, reject) => {
      const sendUser = (err, user) => {
        if (err) {
          reject(new Error(`An error occured fetching a User with id: ${userId}, err: ${err}`))
        }
        resolve(user)
      }
      collection.findOne({userId: userId}, sendUser)
    })
  }

    const addPatient = (patient) => {
    return new Promise((resolve, reject) => {
      db.collection('patients').insertOne(patient, (err, patient) => {
        if (err) {
          reject(new Error('An error occuered registring a user booking, err:' + err))
        }
        resolve(patient)
      })
    })
  }

    const updatePatient = (patientId,patient) => {
    return new Promise((resolve, reject) => {
      const patientToUpdate = {
        userid:patientId
      };
      db.collection('patients').update(patientToUpdate,patient, (err, patient) => {
        if (err) {
          reject(new Error('An error occuered registring a user booking, err:' + err))
        }
        resolve(patient)
      })
    })
  }

  const disconnect = () => {
    db.close()
  }

  return Object.create({
    getAllPatients,
    getPatientByUserId,
    addPatient,
    updatePatient,
    getAllDoctors,
    getDoctorsByUserId,
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