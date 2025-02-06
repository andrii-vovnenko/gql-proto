import { v4 as uuidv4 } from 'uuid';

export class DocumentService {
  constructor(documentRepository) {
    this.documentRepository = documentRepository;
  }
  getDocuments() {
    return this.documentRepository.getDocuments();
  }
  getDocumentById(id) {
    console.log('getDocumentById', id);
    return this.documentRepository.findById(id);
  }
  getDocumentsByServiceId(serviceId) {
    console.log('getDocumentsByServiceId', serviceId);
    return this.documentRepository.findBysServiceId(serviceId);
  }
  createDocument({ title, serviceId, content }) {
    return this.documentRepository.create({ id: uuidv4(), title, serviceId, content });
  }
}