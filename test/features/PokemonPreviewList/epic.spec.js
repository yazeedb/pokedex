import { of } from 'rxjs/observable/of';
import { ActionsObservable } from 'redux-observable';
import { pokedex } from '/endpoints';
import { fetchPokemonEpic } from '/features/PokemonPreviewList/epic';
import { fetchPokemon, setPokemon } from '/features/PokemonPreviewList/duck';
import pokedexJson from '/mockJson/pokedex.json';

describe('fetchPokemonEpic', () => {
  it('calls the correct actions', (done) => {
    const urlSpy = jest.fn();
    const action$ = ActionsObservable.of(fetchPokemon());
    const fetch$ = (url) => {
      urlSpy(url);
      return of(pokedexJson);
    };

    fetchPokemonEpic(action$, null, { fetch$ })
      .subscribe((result) => {
        expect(urlSpy.mock.calls.length).toBe(1);
        expect(urlSpy.mock.calls[0][0]).toBe(pokedex);
        expect(result).toEqual(setPokemon(pokedexJson.pokemon_entries));

        done();
      });
  });
});
