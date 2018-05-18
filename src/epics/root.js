import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { ajax } from 'rxjs/observable/dom/ajax';

const rootEpic = combineEpics();

export default createEpicMiddleware(rootEpic, {
  dependencies: { fetch$: ajax }
});
