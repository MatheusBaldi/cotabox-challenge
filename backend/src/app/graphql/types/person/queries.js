const { gql, ForbiddenError } = require('apollo-server-express');
const FindPerson = require('../../../domain/use-cases/person/find-person/FindPerson');

const typeDefs = gql`
  extend type Query {
  """Query to find all persons"""
    findPersons (count: Int): [Person]
  }  
`;

const resolvers = {
  Query: {
    findPersons:  (
      root,
      data,
      {
        db: { PersonPersistentModel }
      },
    ) => FindPerson(data, { PersonPersistentModel }),
  },
};

module.exports = {
  typeDefs,
  resolvers,
};