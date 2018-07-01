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
      setTitle: () => {},
      data: []
    });

    expect(fetchPokemon.mock.calls.length).toBe(1);
    expect(fetchPokemon.mock.calls[0][0]).toBe(undefined);
  });

  it('calls setTitle on componentDidMount', () => {
    const setTitle = jest.fn();

    getWrapper({
      setTitle,
      fetchPokemon: () => {},
      data: []
    });

    expect(setTitle.mock.calls.length).toBe(1);
    expect(setTitle.mock.calls[0][0]).toBe('ALL POKEMON');
  });

  it('renders a PokemonPreview for each list item', () => {
    const data = pokemonJson.slice(0, 3);
    const elementCount = getWrapper({
      fetchPokemon: () => {},
      setTitle: () => {},
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
      setTitle: () => {},
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
