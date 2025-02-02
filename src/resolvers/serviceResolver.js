const { getServices, getServiceById } = require("../data/serviceData");
const { getDocumentsByServiceId } = require("../data/documentData");

const serviceResolvers = {
  Query: {
    services: async () => await getServices(),
    service: async (_, { id }) => await getServiceById(id),
  },
  Service: {
    documents: async (parent) => await getDocumentsByServiceId(parent.id),
    andere: async (parent) => {
      return !parent.isMale ? "Frau" : "Herr";
    },
  },
};

module.exports = serviceResolvers;
