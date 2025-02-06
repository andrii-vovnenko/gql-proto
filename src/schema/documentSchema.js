import { gql } from 'apollo-server-express';

export default gql`
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