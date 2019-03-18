const { ApolloServer, gql } = require('apollo-server');

const { typeDefs }  = require('./schema/schema')        // get type defs from schema file
const { resolvers } = require('./resolvers/resolvers')  // get resolvers

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options.
server.listen({
  host: 'localhost',
  port: 9090,
}).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});