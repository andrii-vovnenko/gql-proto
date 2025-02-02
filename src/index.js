const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
require("./utils/networkViewerConnector");
// Create Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen({ port: process.env.GRAPHQL_PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
