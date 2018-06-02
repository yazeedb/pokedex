// const pokemon = require('./data/pokemon.json');
// const pokemonDetails = require('./data/pokemonDetails.json');

module.exports = (app, express) => {
  const router = express.Router();

  router.get('/pokemon', (req, res) => {
    res.json({ hello: 'world' });
  });

  router.get('/pokemon/:id', (req, res) => {
    const { id } = req.params;

    res.json({ hello: 'world' });
  });

  return router;
};
