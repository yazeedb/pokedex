import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import { fetchDataEpic } from '/features/PokemonPreviewList/duck';

const rootEpic = combineEpics(
  fetchDataEpic
);

export default createEpicMiddleware(rootEpic, {
  dependencies: { fetch$: ajax }
});
