const { merge } = require('lodash');
const { typeDefs: personObjectTypes } = require('./types');
const { resolvers: personObjectTypesResolvers } = require('./types');
const { typeDefs: personQueries } = require('./queries');
const { resolvers: personQueriesResolvers } = require('./queries');
const { typeDefs: personMutations } = require('./mutations');
const { resolvers: personMutationsResolvers } = require('./mutations');

module.exports = {
  personTypeDefs: [personObjectTypes, personQueries, personMutations],
  personResolvers: merge({}, personObjectTypesResolvers, personQueriesResolvers, personMutationsResolvers),
};