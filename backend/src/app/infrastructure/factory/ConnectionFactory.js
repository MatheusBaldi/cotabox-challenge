const mongoose = require('mongoose');
const env = require('../../../../config');

let singleConnection = null;

const connectionConfig = {
  development: {
    URI: `${env.DB_DRIVE}://${env.DB_HOST}${env.DB_DRIVE==='mongo+srv'?`:${env.DB_PORT}`:''}`,
    options: {
      poolSize: 5,
      autoIndex: true,
      useNewUrlParser: true,
      user: env.DB_USER,
      pass: env.DB_PASSWORD,
      dbName: env.DB_NAME,
    },
  },
  production: {
    URI: `${env.DB_DRIVE}://${env.DB_HOST}${env.DB_DRIVE==='mongo+srv'?`:${env.DB_PORT}`:''}`,
    options: {
      poolSize: 5,
      autoIndex: true,
      useNewUrlParser: true,
      user: env.DB_USER,
      pass: env.DB_PASSWORD,
      dbName: env.DB_NAME,
      retryWrites: true,
      w: 'majority'
    },
  },
};

function getConnection() {
  if (!singleConnection) {
    mongoose.Promise = global.Promise;
    mongoose.set('debug', env.NODE_ENV === 'development');
    singleConnection = mongoose
      .createConnection(
        connectionConfig[env.NODE_ENV].URI,
        connectionConfig[env.NODE_ENV].options,
      );
  }

  return singleConnection;
}

module.exports = getConnection;

