const fs = require('fs');
const fetch = require('isomorphic-fetch');

const { from } = require('rxjs/observable/from');
const { fromPromise } = require('rxjs/observable/fromPromise');
const { forkJoin } = require('rxjs/observable/forkJoin');
const { concatMap, map, toArray } = require('rxjs/operators');

const pokemon = require('../src/api/data/pokemon.json');

const getPokemonDetails = id => `https://pokeapi.co/api/v2/pokemon/${id}/`;
const getPokemonSpecies = id => (
  `https://pokeapi.co/api/v2/pokemon-species/${id}/`
);

fs.writeFileSync('src/api/data/pokemonDetails.json');
const out = fs.createWriteStream('src/api/data/pokemonDetails.json');

const fetchIt = url => fromPromise(
  fetch(url).then(res => res.json())
);

from(pokemon).pipe(
  map(({ id }) => ({
    detailsUrl: getPokemonDetails(id),
    speciesUrl: getPokemonSpecies(id)
  })),
  concatMap(({ detailsUrl, speciesUrl }) => (
    forkJoin(fetchIt(detailsUrl), fetchIt(speciesUrl), (details, species) => {
      console.log('returning', detailsUrl, 'and', speciesUrl);

      return {
        details,
        species
      };
    })
  )),
  toArray(),
  map(JSON.stringify)
)
  .subscribe((result) => {
    console.log('done');
    out.write(result);
  });
