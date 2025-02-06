import { gql } from "apollo-server-express";

export default gql`
  type Service {
    id: ID!
    name: String!
    description: String
    documents: [Document!]!
    number: Int!
    andere: String!
  }

  type Query {
    services: [Service!]!
    service(id: ID!): Service
  }
`;
