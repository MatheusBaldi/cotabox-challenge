const dotenv = require('dotenv');
const fs = require('fs');

const result = dotenv.config({silent: true})

// if (result.error) throw result.error;
module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_DRIVE: process.env.DB_DRIVE || 'mongodb',
  DB_USER: process.env.DB_USER || '',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || '27017',
  DB_NAME: process.env.DB_NAME || 'test',
  API_URI: process.env.API_URI || '/graphql',
  PORT: process.env.PORT || '4000'
};