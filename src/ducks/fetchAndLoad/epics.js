import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { fetchData, setData } from './';

export const fetchDataEpic = endpoint => (
  action$,
  store,
  { fetch$ }
) => action$.pipe(
  ofType(fetchData.type),
  switchMap(() => fetch$(endpoint).pipe(
    switchMap(({ response }) => of(
      setData(response)
    ))
  ))
);

export default [
  fetchDataEpic
];
