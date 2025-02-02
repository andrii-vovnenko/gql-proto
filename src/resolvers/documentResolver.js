const { getDocuments, getDocumentById } = require("../data/documentData");
const { getServiceById } = require("../data/serviceData");

const documentResolvers = {
  Query: {
    documents: async () => await getDocuments(),
    document: async (_, { id }) => await getDocumentById(id),
  },
  Document: {
    service: async (document) => await getServiceById(document.serviceId),
  },
};

module.exports = documentResolvers;
