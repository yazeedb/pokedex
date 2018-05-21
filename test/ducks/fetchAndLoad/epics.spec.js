import { of } from 'rxjs/observable/of';
import { ActionsObservable } from 'redux-observable';
import { pokedex } from '/endpoints';
import createDuck from '/ducks/fetchAndLoad';
import { makeFetchDataEpic } from '/ducks/fetchAndLoad/epics';
import pokemonJson from '/api/data/pokemon.json';

describe('makeFetchDataEpic', () => {
  it('works', (done) => {
    const { actions } = createDuck('test');
    const list = pokemonJson.slice(0, 10);
    const urlSpy = jest.fn();
    const action$ = ActionsObservable.of(actions.fetchData());

    const fetch$ = (url) => {
      urlSpy(url);
      return of({ response: list });
    };

    const fetchDataEpic = makeFetchDataEpic({
      type: actions.fetchData.type,
      endpoint: pokedex,
      successActions: [actions.setData]
    });

    fetchDataEpic(action$, null, { fetch$ })
      .subscribe((result) => {
        expect(urlSpy.mock.calls.length).toBe(1);
        expect(urlSpy.mock.calls[0][0]).toBe(pokedex);
        expect(result).toEqual(actions.setData(list));

        done();
      });
  });
});
