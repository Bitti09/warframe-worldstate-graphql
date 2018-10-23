const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { importSchema } = require("graphql-import");
const typeDefs = importSchema("schema.graphql");
const resolvers = require("./resolvers.js");
const { ApolloEngine } = require("apollo-engine");

// Construct a  schema, using GraphQL schema language
// Provide resolver functions for your schema fields

const server = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: true,
  cacheControl: true,
  printErrors: true, // optional
  pretty: true,

  // We set `engine` to false, so that the new agent is not used.
  engine: false
});

const app = express();
server.applyMiddleware({
  app
});
const engine = new ApolloEngine({
  apiKey: "key"
});
engine.listen(
  {
    port: 4000,
    expressApp: app
  },
  () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
