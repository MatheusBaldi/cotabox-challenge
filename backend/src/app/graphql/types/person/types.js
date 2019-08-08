const { gql } = require('apollo-server-express');

const typeDefs = gql`
  """Object Type that represents a Person"""
  type Person {
    id: ID!
    firstName: String!
    lastName: String!
    participation: Int!
  }
`;

const resolvers = {
  Person: {
    // Use database root._id or root.id as the id attribute
    id: root => root._id || root.id,
  },
};

module.exports = {
  typeDefs,
  resolvers,
};