const pokemon = require('./data/pokemon.json');
const pokemonDetails = require('./data/pokemonDetails');
const formatSpecies = require('./helpers/formatSpecies');

module.exports = (app, express) => {
  const router = express.Router();

  router.get('/pokemon', (req, res) => {
    res.json(pokemon);
  });

  router.get('/pokemon/:id', (req, res) => {
    const { details, species } = pokemonDetails[req.params.id - 1];

    res.json({
      details,
      species: formatSpecies(species)
    });
  });

  return router;
};
