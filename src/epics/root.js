import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import { fetchDataEpic } from '/features/PokemonPreviewList/duck';
import { fetchPokemonDetailsEpic } from '/features/PokemonDetail/duck';

const rootEpic = combineEpics(
  fetchDataEpic,
  fetchPokemonDetailsEpic
);

export default createEpicMiddleware(rootEpic, {
  dependencies: { fetch$: ajax }
});
