import fetch from 'node-fetch';

let counter = 0;

setInterval(() => {
  fetch(`https://jsonplaceholder.typicode.com/todos/${++counter}`)
}, 1000);

export class ServicesRepository {
  constructor() {
    this.services = [
      { id: "1", name: 1, description: "Cloud hosting service", number: 1, isMale: true },
      { id: "2", name: "Storage", description: "Secure document storage", number: 2, isMale: false },
    ];
  }
  getServices() {
    return this.services;
  }
  findById(id) {
    return this.services.find(service => service.id === id);
  }
  create(service) {
    this.services.push(service);
    return service;
  }
}

