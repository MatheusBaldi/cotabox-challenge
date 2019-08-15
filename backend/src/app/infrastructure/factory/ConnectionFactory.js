const mongoose = require('mongoose');

let singleConnection = null;

const connectionConfig = {
  development: {
    URI: 'mongodb://127.0.0.1:27017/ctbx',
    options: {
      poolSize: 5,
      autoIndex: true,
      useNewUrlParser: true,
    },
  },
  production: {
    URI: `${process.env.DB_DRIVE}://${process.env.DB_HOST}:${process.env.DB_PORT}`,
    options: {
      poolSize: 5,
      autoIndex: true,
      useNewUrlParser: true,
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
      dbName: process.env.DB_NAME,
      retryWrites: true,
      w: 'majority'
    },
  },
};

function getConnection() {
  if (!singleConnection) {
    mongoose.Promise = global.Promise;
    mongoose.set('debug', process.env.NODE_ENV === 'development');
    singleConnection = mongoose
      .createConnection(
        connectionConfig[process.env.NODE_ENV].URI,
        connectionConfig[process.env.NODE_ENV].options,
      );
  }

  return singleConnection;
}

module.exports = getConnection;

