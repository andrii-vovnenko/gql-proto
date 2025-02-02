const documents = [
  { id: "101", title: "Service Agreement", content: "Terms and conditions...", serviceId: "1" },
  { id: "102", title: "Storage Policy", content: "Data retention rules...", serviceId: "2" },
];

const getDocuments = async () => documents;
const getDocumentsByServiceId = async (serviceId) => documents.filter(doc => doc.serviceId === serviceId);
const getDocumentById = async (id) => documents.find(doc => doc.id === id);

module.exports = { getDocuments, getDocumentsByServiceId, getDocumentById };
