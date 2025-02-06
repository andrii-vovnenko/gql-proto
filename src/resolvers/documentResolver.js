export default {
  Query: {
    documents: async (_, __, { container }) => container.services.documents.getDocuments( ),
    document: async (_, { id }, { container }) => container.services.documents.getDocumentById(id),
  },
  Document: {
    service: async (document, _, { container }) => container.services.services.getServiceById(document.serviceId),
  },
};