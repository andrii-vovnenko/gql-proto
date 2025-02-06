import { ApolloServer } from "apollo-server";
import typeDefs from "./schema/index.js";
import resolvers from "./resolvers/index.js";

import { ServicesRepository } from "./repositories/ServicesRepository.js";
import { DocumentRepository } from "./repositories/DocumentsRepository.js";
import { ServicesService } from "./services/Services.js";
import { DocumentService } from "./services/Document.js";

class Container {
  constructor() {
    this.services = {};
  }
  register(name, service) {
    this.services[name] = service;
  }
  resolve(name) {
    return this.services[name];
  }
}
const container = new Container();
container.register("services", new ServicesService(new ServicesRepository()));
container.register("documents", new DocumentService(new DocumentRepository()));

// Create Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers, context: { container } });

// Start the server
server.listen({ port: process.env.GRAPHQL_PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
