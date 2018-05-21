import Component from '/features/PokemonPreviewList/component';
import PokemonPreview from '/features/PokemonPreview';
import { mountWithRouter } from '/wrapper';
import pokemonJson from '/api/data/pokemon.json';

const getWrapper = mountWithRouter(Component);

describe('PokemonPreviewList', () => {
  it('calls fetchPokemon on componentDidMount', () => {
    const fetchPokemon = jest.fn();

    getWrapper({
      fetchPokemon,
      data: []
    });

    expect(fetchPokemon.mock.calls.length).toBe(1);
    expect(fetchPokemon.mock.calls[0][0]).toBe(undefined);
  });

  it('shows loading indicator if fetching', () => {
    const loading = getWrapper({
      fetching: true,
      fetchPokemon: () => {},
      data: []
    })
      .find('[data-test="loading"]');

    expect(loading.length).toBe(1);
  });

  it('renders a PokemonPreview for each list item', () => {
    const data = pokemonJson.slice(0, 3);
    const elementCount = getWrapper({
      fetchPokemon: () => {},
      fetching: false,
      data
    })
      .find(PokemonPreview)
      .length;

    expect(elementCount).toBe(3);
  });

  it('passes the correct props to each PokemonPreview', () => {
    const data = pokemonJson.slice(0, 1);
    const { id, name, types } = data[0];
    const componentProps = getWrapper({
      fetchPokemon: () => {},
      fetching: false,
      data
    })
      .find(PokemonPreview)
      .props();

    expect(componentProps).toEqual({
      id,
      name,
      types,
      spriteUrl: `pokemon/icons/${id}.png`
    });
  });
});
