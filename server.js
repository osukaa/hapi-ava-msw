const Hapi = require('@hapi/hapi');

const server = Hapi.Server();

server.route([
  {
    method: 'GET',
    path: '/game-generations',
    handler: async (request, h) => {
      const res = await fetch('https://pokeapi.co/api/v2/generation/');
      const payload = await res.json();

      return payload;
    },
  }
]);

module.exports = { server };