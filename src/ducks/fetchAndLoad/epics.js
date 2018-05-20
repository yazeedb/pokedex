import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

export const fetchDataEpic = ({
  type,
  endpoint,
  successActions = []
}) => (action$, store, { fetch$ }) => action$.pipe(
  ofType(type),
  switchMap(() => fetch$(endpoint).pipe(
    switchMap(({ response }) => {
      const actions = successActions.map(action => action(response));

      return of(...actions);
    })
  ))
);

export default [
  fetchDataEpic
];
