const fs = require('fs');
const fetch = require('isomorphic-fetch');
const { Observable } = require('rxjs');

const getPokemonDetails = id => `https://pokeapi.co/api/v2/pokemon/${id}/`;
const pokemon = require('../src/api/data/pokemon.json');

fs.writeFileSync('src/api/data/pokemonDetails.json');
const out = fs.createWriteStream('src/api/data/pokemonDetails.json');

Observable.from(pokemon)
  .concatMap(({ id }) => Observable.fromPromise(
    fetch(getPokemonDetails(id))
      .then(res => res.json())
      .then((json) => {
        console.log('got', id);

        return json;
      })
  ))
  .toArray()
  .map(JSON.stringify)
  .subscribe((result) => {
    console.log('done, writing');
    out.write(result);
  });
