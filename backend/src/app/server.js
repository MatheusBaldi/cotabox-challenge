// Express
const express = require('express');

// GraphQL Server
const { ApolloServer } = require('apollo-server-express');

// GraphQL Schema
const schema = require('./graphql/schema');

// Middlewares
const helmet = require('helmet');
const compression = require('compression');

// Other dependencies
const Logger = require('./utils/Logger');
const mongo = require('./infrastructure/mongodb-models/index')();

const app = express();
const PORT = process.env.PORT || 4000;

// Apply Middlewares
app.use(helmet());
app.use(compression());

// Start GraphQL
const server = new ApolloServer({
  schema,
  context: ({ req }) => ({
    ...req,
    db: mongo,
    Logger
  }),
});

server.applyMiddleware({
  app,
  path: '/graphql',
  cors: {
    origin: '*',
    methods: 'GET, POST, OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204
  }
});

app.listen(
  {
    port: PORT
  },
  () => {
    Logger.info(`Apollo GraphQL Server Express running on port ${PORT}`);
  }
);