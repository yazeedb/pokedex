const pokemon = require('./data/pokemon.json');
const pokemonDetails = require('./data/pokemonDetails.json');

module.exports = (app, express) => {
  const router = express.Router();

  router.get('/pokemon', (req, res) => {
    res.json(pokemon);
  });

  router.get('/pokemon/:id', (req, res) => {
    const { id } = req.params;

    res.json(pokemonDetails[id - 1]);
  });

  return router;
};
