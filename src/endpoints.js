import { concat, pipe } from 'ramda';
import isBrowser from '/helpers/isBrowser';

const base = 'http://localhost:3000';

const relative = {
  pokedex: '/api/pokemon',
  getPokemonDetails: id => `/api/pokemon/${id}`
};

const absolute = {
  pokedex: base + relative.pokedex,
  getPokemonDetails: pipe(
    relative.getPokemonDetails,
    concat(base)
  )
};

export default () => (isBrowser() ? relative : absolute);
