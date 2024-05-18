// test.js
const test = require('ava');
const { setupServer } = require('msw/node');
const { http, HttpResponse } = require('msw');

const { server } = require('./server.js');

const mockServer = setupServer();

test.before(() => mockServer.listen());
test.after(() => mockServer.close());

test('should be happy', async (t) => {
  mockServer.use(http.get('https://pokeapi.co/api/v2/generation/', () => {
    return HttpResponse.json({
      "count": 9,
      "next": null,
      "previous": null,
      "results": [
        {
          "name": "generation-i",
          "url": "https://pokeapi.co/api/v2/generation/1/"
        },
        {
          "name": "generation-ii",
          "url": "https://pokeapi.co/api/v2/generation/2/"
        },
        {
          "name": "generation-iii",
          "url": "https://pokeapi.co/api/v2/generation/3/"
        },
        {
          "name": "generation-iv",
          "url": "https://pokeapi.co/api/v2/generation/4/"
        },
        {
          "name": "generation-v",
          "url": "https://pokeapi.co/api/v2/generation/5/"
        },
        {
          "name": "generation-vi",
          "url": "https://pokeapi.co/api/v2/generation/6/"
        },
        {
          "name": "generation-vii",
          "url": "https://pokeapi.co/api/v2/generation/7/"
        },
        {
          "name": "generation-viii",
          "url": "https://pokeapi.co/api/v2/generation/8/"
        },
        {
          "name": "generation-ix",
          "url": "https://pokeapi.co/api/v2/generation/9/"
        }
      ]
    });
  }));

  const { statusCode } = await server.inject('/game-generations');

  t.is(statusCode, 200);
});

test('should be sad', mockServer.boundary(async (t) => {
    mockServer.use(http.get('https://pokeapi.co/api/v2/generation/', () => {
        return HttpResponse.error();
    }));
    
    const { statusCode } = await server.inject('/game-generations');

    t.is(statusCode, 500);
}));