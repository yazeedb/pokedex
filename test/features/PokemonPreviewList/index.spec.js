import {
  PokemonPreviewList,
  mapStateToProps
} from '/features/PokemonPreviewList';
import { mountWrapper } from '/wrapper';

const getWrapper = mountWrapper(PokemonPreviewList);

describe('PokemonPreviewList', () => {
  it('calls fetchPokemon on componentDidMount', () => {
    const fetchPokemon = jest.fn();

    getWrapper({ fetchPokemon });

    expect(fetchPokemon.mock.calls.length).toBe(1);
    expect(fetchPokemon.mock.calls[0][0]).toBe(undefined);
  });

  describe('mapStateToProps', () => {
    it('returns the correct state', () => {
      const state = mapStateToProps({
        pokemonPreviewList: {
          fetching: false,
          list: []
        }
      });

      expect(state).toEqual({
        fetching: false,
        list: []
      });
    });
  });
});
