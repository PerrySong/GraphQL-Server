const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs }  = require('./schema/schema');        // get type defs from schema file
const { resolvers } = require('./resolvers/resolvers');  // get resolvers
const fs = require('fs');
const https = require('https');
const http = require('http');

// NO HTTPS SUPPORTED YET. Code can be uncommented when https support is ready
const configurations = {
  // Note: You may need sudo to run on port 443
  // production: { ssl: true, port: 6996, hostname: 'example.com' },
  development: { ssl: false, port: 9090, hostname: 'localhost' }
  // development: { ssl: false, port: 9090, hostname: 'localhost' }
}
// const environment = process.env.NODE_ENV || 'production'
const environment = process.env.NODE_ENV || 'development'
const config = configurations[environment]

const apollo = new ApolloServer({ typeDefs, resolvers })

const app = express()
apollo.applyMiddleware({ app })

const server = http.createServer(app);
// No SSL yet
// Create the HTTPS or HTTP server, per configuration
// var server
// if (config.ssl) {
//   // Assumes certificates are in .ssl folder from package root. Make sure the files
//   // are secured.
//   server = https.createServer(
//     {
//       key: fs.readFileSync(`./ssl/${environment}/server.key`),
//       cert: fs.readFileSync(`./ssl/${environment}/server.crt`)
//     },
//     app
//   )
// } else {
  // server = http.createServer(app)
// }

// Add subscription support
// apollo.installSubscriptionHandlers(server)

server.listen({ port: config.port }, () =>
  console.log(
    '🚀 Server ready at',
    `http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}${apollo.graphqlPath}`
  )
)

// const { ApolloServer, gql } = require('apollo-server');
// // In the most basic sense, the ApolloServer can be started
// // by passing type definitions (typeDefs) and the resolvers
// // responsible for fetching the data for those types.
// const server = new ApolloServer({ typeDefs, resolvers });

// // This `listen` method launches a web-server.  Existing apps
// // can utilize middleware options.
// server.listen({
//   host: 'localhost',
//   port: 9090,
// }).then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });