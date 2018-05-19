import { mapStateToProps } from '/features/PokemonPreviewList';

describe('PokemonPreviewList', () => {
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
