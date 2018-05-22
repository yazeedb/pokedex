import Component from '/features/PokemonDetail/component';
import { mountWithRouter } from '/wrapper';
import pokemonJson from '/api/data/pokemonDetails.json';

const getWrapper = mountWithRouter(Component);

describe('PokemonDetail', () => {
  it('calls fetchPokemonDetails with ID on didMount', () => {
    const fetchPokemonDetails = jest.fn();

    getWrapper({
      data: pokemonJson[0],
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

  it('renders the pokemon\'s sugimori image', () => {
    const { details, species } = pokemonJson[0];

    const img = getWrapper({
      data: { details, species },
      fetchPokemonDetails: () => {},
      match: {
        params: {
          id: 1
        }
      }
    })
      .find('[data-test="sugimori-img"]');

    expect(img.length).toBe(1);
    expect(img.prop('alt')).toBe(details.name);
    expect(img.prop('src')).toBe(`pokemon/sugimori/${details.id}.png`);
  });
});
