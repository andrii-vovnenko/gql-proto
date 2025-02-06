export class DocumentRepository {
  constructor() {
    this.documents = [
      { id: "101", title: "Service Agreement", content: "Terms and conditions...", serviceId: "1" },
      { id: "102", title: "Storage Policy", content: "Data retention rules...", serviceId: "2" },
      { id: "103", title: "Service Level Agreement", content: "Service uptime and support...", serviceId: "1" },
      { id: "104", title: "Privacy Policy", content: "Data protection and privacy...", serviceId: "2" },
      { id: "105", title: "Acceptable Use Policy", content: "Rules for using the service...", serviceId: "1" },
    ];

  }
  getDocuments() {
    return this.documents;
  }
  findById(id) {
    return this.documents.find(doc => doc.id === id);
  }
  findBysServiceId(serviceId) {
    return this.documents.filter(doc => doc.serviceId === serviceId);
  }
  create(document) {
    this.documents.push(document);
    return document;
  }
}
