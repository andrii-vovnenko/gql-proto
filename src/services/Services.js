import { v4 as uuidv4 } from 'uuid';

export class ServicesService {
  constructor(ServiceRepository) {
    this.ServiceRepository = ServiceRepository;
  }
  getServices() {
    return this.ServiceRepository.getServices();
  }
  getServiceById(id) {
    return this.ServiceRepository.findById(id);
  }
  createService({ name, description, number, isMale }) {
    return this.ServiceRepository.create({ id: uuidv4(), name, description, number, isMale });
  }
}