const dependencies = {
	Schema: require('mongoose').Schema,
};

let mappingObjects = null;

function MappingObjects(injection) {

  const { Schema } = Object.assign({}, dependencies, injection);
  let { conn } = Object.assign({}, dependencies, injection);

  if (!conn) {
    conn = require('../factory/ConnectionFactory')();
  }

  if (!mappingObjects) {
    mappingObjects = {
      PersonPersistentModel: require('./PersonPersistentModel')({ connection: conn, Schema }),
    }
  }

  return mappingObjects;
}

module.exports = injection => MappingObjects(injection);