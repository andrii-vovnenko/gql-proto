const fetch = require('node-fetch');

const services = [
  { id: "1", name: 1, description: "Cloud hosting service", number: 1, isMale: true },
  { id: "2", name: "Storage", description: "Secure document storage", number: 2, isMale: false },
];

setInterval(() => {
  fetch('https://jsonplaceholder.typicode.com/todos/1')
      // .then(response => response.json())
      // .then(json => console.log(json))
}, 1000);

const getServices = async () => services;
const getServiceById = async (id) => services.find(service => service.id === id);

module.exports = { getServices, getServiceById };
