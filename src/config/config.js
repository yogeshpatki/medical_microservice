const dbSettings = {
    db: 'testdb',
    user: 'admin_22',
    pass: 'pword98',
    repl: 'rs1',
    servers: (process.env.DB_SERVERS) ? process.env.DB_SERVERS.split(' ') : [
      '127.0.0.1:27017'
    ],
    dbParameters: () => ({
      w: 'majority',
      wtimeout: 10000,
      j: true,
      readPreference: 'ReadPreference.SECONDARY_PREFERRED',
      native_parser: false
    }),
    serverParameters: () => ({
      autoReconnect: true,
      poolSize: 10,
      socketoptions: {
        keepAlive: 300,
        connectTimeoutMS: 30000,
        socketTimeoutMS: 30000
      }
    }),
    replsetParameters: (replset = 'rs1') => ({
      replicaSet: replset,
      ha: true,
      haInterval: 10000,
      poolSize: 10,
      socketoptions: {
        keepAlive: 300,
        connectTimeoutMS: 30000,
        socketTimeoutMS: 30000
      }
    })
  }
  
  const serverSettings = {
    port: process.env.PORT || 3000,
    ssl: require('./ssl')
  }
  
  module.exports = Object.assign({}, { dbSettings, serverSettings })