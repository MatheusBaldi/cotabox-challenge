
const { merge, flatten } = require('lodash');
const { makeExecutableSchema } = require('graphql-tools');
const { gql } = require('apollo-server-express');

const { personTypeDefs, personResolvers } = require('./types/person/');

// Default empty root types
const RootTypes = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

const rootTypeDefs = [RootTypes];

const typeDefs = flatten([rootTypeDefs, personTypeDefs]);
const resolvers = merge({}, personResolvers);

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});