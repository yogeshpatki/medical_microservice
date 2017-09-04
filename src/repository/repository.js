'use strict'

const repository = (db) => {
  const patients_collection = db.collection('patients')
  const doctors_collection = db.collection('doctors')

 
  const getAllPatients = () => {
    return getAllUsers(patients_collection);
  }

  const getPatientByUserId = (userId) => {
    return getUserById(userId,patients_collection);
  }

  const addPatient = (patient) => {
      return addUser(patient,patients_collection);
   }

  const updatePatient = (userId,patient) => {
    const patientToUpdate = {
        userId:userId
      };
    return updateUser(patientToUpdate,patient,patients_collection);
  }

  const deletePatient = (patientId) => {
    var user = {userId: patientId};
    return deleteUser(user,patients_collection)
  }



  const getAllDoctors = () => {
    return getAllUsers(doctors_collection);
  }

  const getDoctorsByUserId = (userId) => {
    return getUserById(userId,doctors_collection);
  }

  const addDoctor = (doctor) => {
    return addUser(doctor,doctors_collection);
  }

 const updateDoctor = (userId,doctor) => {
    const doctorToUpdate = {
        userId:userId
      };
    return updateUser(doctorToUpdate,doctor,doctors_collection);
  }


  const deleteDoctor = (patientId) => {
    var user = {userId: patientId};
    return deleteUser(user,doctors_collection)
  }

  const getAllUsers = (collection) => {
    return new Promise((resolve, reject) => {
      const users = []
      const cursor = collection.find({})
      const addUser = (user) => {
        users.push(user)
      }
      const sendUsers = (err) => {
        if (err) {
          reject(new Error('An error occured fetching all users, err:' + err))
        }
        resolve(users.slice())
      }
      cursor.forEach(addUser, sendUsers)
    })
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

  const addUser = (user,collection) =>{
    return new Promise((resolve, reject) => {
      collection.insertOne(user, (err, user) => {
        if (err) {
          reject(new Error('An error occuered registring a user booking, err:' + err))
        }
        resolve(user)
      })
    })
  }

const updateUser = (user,newUser,collection) => {
  return new Promise((resolve, reject) => {
      doctors_collection.update(user,newUser, (err, newUser) => {
        if (err) {
          reject(new Error('An error occuered registring a user, err:' + err))
        }
        resolve(newUser)
      })
    })
}

const deleteUser = (user,collection) =>{
  return new Promise((resolve, reject) => {
      collection.remove(user, (err, patient) => {
        if (err) {
            reject(new Error('An error occuered deleting User, err:' + err))
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
    deletePatient,
    getAllDoctors,
    getDoctorsByUserId,
    addDoctor,
    updateDoctor,
    deleteDoctor,
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