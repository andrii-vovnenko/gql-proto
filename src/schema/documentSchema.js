const { gql } = require("apollo-server");

const documentTypeDefs = gql`
  type Document {
    id: ID!
    title: String!
    content: String!
    service: Service!  # Reference to service
  }

  type Query {
    documents: [Document!]!
    document(id: ID!): Document
  }
`;

module.exports = documentTypeDefs;
