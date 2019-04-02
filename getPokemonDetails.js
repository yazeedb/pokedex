const fs = require('fs');
const fetch = require('isomorphic-fetch');
const { from, forkJoin } = require('rxjs');
const { concatMap, map } = require('rxjs/operators');

const condenseDetails = require('./condenseDetails');
const condenseSpecies = require('./condenseSpecies');

const getPokemonDetails = (id) => `https://pokeapi.co/api/v2/pokemon/${id}/`;
const getPokemonSpecies = (id) =>
  `https://pokeapi.co/api/v2/pokemon-species/${id}/`;

const writePath = './pokemonDetails.json';

fs.writeFileSync(writePath);
const out = fs.createWriteStream(writePath);

const fetchIt = (url) => from(fetch(url).then((res) => res.json()));

// begin JSON array
out.write('[');

const pokemon = Array.from({ length: 649 }, (_, index) => index + 1);

from(pokemon)
  .pipe(
    map((id) => ({
      detailsUrl: getPokemonDetails(id),
      speciesUrl: getPokemonSpecies(id),
      id
    })),
    concatMap(({ detailsUrl, speciesUrl, id }) =>
      forkJoin(fetchIt(detailsUrl), fetchIt(speciesUrl), (details, species) => {
        console.log('returning', detailsUrl, 'and', speciesUrl);

        const pokemonJSON = JSON.stringify({
          details: condenseDetails(details),
          species: condenseSpecies(species)
        });
        // prepend comma if not first pokemon
        const data = id === 1 ? pokemonJSON : `,${pokemonJSON}`;

        out.write(data);

        return id;
      })
    )
  )
  .subscribe((id) => {
    if (id === pokemon.length) {
      console.log('we are done');
      out.write(']');
    } else {
      console.log('keep going');
    }
  });
