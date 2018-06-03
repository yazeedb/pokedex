import { fromPromise } from 'rxjs/observable/fromPromise';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import fetch from 'isomorphic-fetch';
import { fetchDataEpic } from '/features/PokemonPreviewList/duck';
import { fetchPokemonDetailsEpic } from '/features/PokemonDetail/duck';


const fetch$ = (...args) => {
  const getJson = fetch(...args)
    .then(res => res.json());

  return fromPromise(getJson);
};

export const rootEpic = combineEpics(
  fetchDataEpic,
  fetchPokemonDetailsEpic
);

export default createEpicMiddleware(rootEpic, {
  dependencies: { fetch$ }
});
