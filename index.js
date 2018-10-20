const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { importSchema } = require("graphql-import");
const typeDefs = importSchema("schema.graphql");
const resolvers = require("./resolvers.js");
const fs = require("fs");
var url = "http://content.warframe.com/dynamic/worldState.php";
let rawdata = fs.readFileSync("my_data.json");

// Construct a  schema, using GraphQL schema language
// Provide resolver functions for your schema fields

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const app = express();
server.applyMiddleware({
  app
});
app.listen(
  {
    port: 4000
  },
  () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
