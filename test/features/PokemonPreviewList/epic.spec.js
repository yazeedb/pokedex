import { of } from 'rxjs/observable/of';
import { ActionsObservable } from 'redux-observable';
import { pokedex } from '/endpoints';
import { fetchPokemonEpic } from '/features/PokemonPreviewList/epics';
import { fetchPokemon, setPokemon } from '/features/PokemonPreviewList/duck';
import pokemonJson from '/api/data/pokemon.json';

describe('fetchPokemonEpic', () => {
  it('calls the correct actions', (done) => {
    const list = pokemonJson.slice(0, 10);
    const urlSpy = jest.fn();
    const action$ = ActionsObservable.of(fetchPokemon());
    const fetch$ = (url) => {
      urlSpy(url);
      return of({ response: list });
    };

    fetchPokemonEpic(action$, null, { fetch$ })
      .subscribe((result) => {
        expect(urlSpy.mock.calls.length).toBe(1);
        expect(urlSpy.mock.calls[0][0]).toBe(pokedex);
        expect(result).toEqual(setPokemon(list));

        done();
      });
  });
});
