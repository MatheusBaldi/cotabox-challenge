const { gql } = require('apollo-server-express');
const CreatePerson = require('../../../domain/use-cases/person/create-person/CreatePerson');
const DeletePerson = require('../../../domain/use-cases/person/delete-person/DeletePerson');

const typeDefs = gql`
  extend type Mutation {
    """Mutation to create a Person"""
    addPerson(
        firstName: String!
        lastName: String!
        participation: Int!
      ): Person

    """Mutation to remove a Person"""
    removePerson(id: ID!): Person
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
    ) => CreatePerson(data, { PersonPersistentModel, Logger }),

    removePerson:  (
      root,
      data,
      {
        db: { PersonPersistentModel },
        Logger
      }
    ) => DeletePerson(data, { PersonPersistentModel, Logger })
  }
};

module.exports = {
  typeDefs,
  resolvers,
};