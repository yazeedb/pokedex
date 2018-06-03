// const pokemon = require('./data/pokemon.json');
// const pokemonDetails = require('./data/pokemonDetails.json');

module.exports = (app, express) => {
  const router = express.Router();

  router.get('/pokemon', (req, res) => {
    // res.json(pokemon);
    res.json([
      {
        "id": 1,
        "name": "Bulbasaur",
        "types": [
          "Grass",
          "Poison"
        ]
      },
      {
        "id": 2,
        "name": "Ivysaur",
        "types": [
          "Grass",
          "Poison"
        ]
      }])
  });

  router.get('/pokemon/:id', (req, res) => {
    const { id } = req.params;

    // res.json(pokemonDetails[id - 1]);
    res.json({ success: true });
  });

  return router;
};
