const { gql } = require('apollo-server-express');
const CreatePerson = require('../../../domain/use-cases/person/create-person/CreatePerson');

const typeDefs = gql`
  extend type Mutation {
  """Mutation to create a Person"""
    addPerson(
      firstName: String!
      lastName: String!
      participation: Int!
    ): Person
  }
`;

const resolvers = {
  Mutation: {
    addPerson:  (
      root,
      data,
      {
        db: { PersonPersistentModel },
        Logger
      }
    ) => CreatePerson(data, { PersonPersistentModel, Logger })
  }
};

module.exports = {
  typeDefs,
  resolvers,
};