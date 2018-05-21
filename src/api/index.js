const pokemon = require('./data/pokemon.json');

module.exports = (app, express) => {
  const router = express.Router();

  router.get('/pokemon', (req, res) => {
    res.json(pokemon);
  });

  router.get('/pokemon/:id', (req, res) => {
    res.json({ success: true });
  });

  return router;
};
