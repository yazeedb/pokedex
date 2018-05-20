const pokemon = require('./data/pokemon.json');

module.exports = (app, express) => {
  const router = express.Router();

  router.get('/pokemon', (req, res) => {
    res.json(pokemon);
  });

  return router;
};
