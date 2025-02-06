export default {
  Query: {
    services: async (_, __, { container }) => container.services.services.getServices(),
    service: async (_, { id }, { container }) => container.services.services.getServiceById(id),
  },
  Service: {
    documents: async (parent, _, { container }) => container.services.documents.getDocumentsByServiceId(parent.id),
    andere: async (parent) => {
      return !parent.isMale ? "Frau" : "Herr";
    },
  },
};