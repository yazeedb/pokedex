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

  it('shows loading indicator if fetching', () => {
    const loading = getWrapper({
      fetching: true,
      fetchPokemon: () => {}
    })
      .find('[data-test="loading"]');

    expect(loading.length).toBe(1);
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
