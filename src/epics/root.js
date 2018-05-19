import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import pokemonPreviewListEpics from '/features/PokemonPreviewList/epics';

const rootEpic = combineEpics(
  ...pokemonPreviewListEpics
);

export default createEpicMiddleware(rootEpic, {
  dependencies: { fetch$: ajax }
});
