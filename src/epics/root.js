import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import { sendSignupInfoEpic } from '/features/Signup/Signup.epics';

const rootEpic = combineEpics(sendSignupInfoEpic);

export default createEpicMiddleware(rootEpic, {
  dependencies: { fetch$: ajax }
});
