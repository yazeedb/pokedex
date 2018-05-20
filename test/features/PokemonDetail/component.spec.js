import Component from '/features/PokemonDetail/component';
import { mountWithRouter } from '/wrapper';

const getWrapper = mountWithRouter(Component);

describe('PokemonDetail', () => {
  it('calls fetchPokemonDetails with ID on didMount', () => {
    const fetchPokemonDetails = jest.fn();

    getWrapper({
      fetchPokemonDetails,
      match: {
        params: {
          id: 1
        }
      }
    });

    expect(fetchPokemonDetails.mock.calls.length).toBe(1);
    expect(fetchPokemonDetails.mock.calls[0][0]).toBe(1);
  });
});
