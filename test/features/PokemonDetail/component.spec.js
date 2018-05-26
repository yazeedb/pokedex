import Component from '/features/PokemonDetail/component';
import TypeBadge from '/components/TypeBadge';
import { mountWithRouter } from '/wrapper';
import pokemonJson from '/api/data/test-pokemon.json';
import getFlavorTextEntries from '/helpers/getFlavorTextEntries';
import upperFirst from '/helpers/upperFirst';

const getWrapper = mountWithRouter(Component);

describe('PokemonDetail', () => {
  it('calls fetchPokemonDetails with ID on didMount', () => {
    const fetchPokemonDetails = jest.fn();

    getWrapper({
      data: pokemonJson,
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

  it('shows loading indicator if fetching', () => {
    const loading = getWrapper({
      fetching: true,
      data: { details: {}, species: {} },
      fetchPokemonDetails: () => {},
      match: {
        params: {
          id: 1
        }
      }
    })
      .find('[data-test="loading"]');

    expect(loading.length).toBe(1);
  });

  it('renders the pokemon\'s sugimori image', () => {
    const { details, species } = pokemonJson;

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

  it('renders the pokemon\'s name', () => {
    const { details, species } = pokemonJson;
    const name = getWrapper({
      data: { details, species },
      fetchPokemonDetails: () => {},
      match: {
        params: {
          id: 1
        }
      }
    })
      .find('[data-test="name"]')
      .text();

    expect(name).toBe(upperFirst(details.name));
  });

  it('renders the pokemon\'s ID and English genus', () => {
    const { details, species } = pokemonJson;
    const text = getWrapper({
      data: { details, species },
      fetchPokemonDetails: () => {},
      match: {
        params: {
          id: 1
        }
      }
    })
      .find('[data-test="id-genus"]')
      .text();

    expect(text).toBe('#1 Seed Pokémon');
  });

  it('renders a TypeBadge for each type', () => {
    const { details, species } = pokemonJson;
    const count = getWrapper({
      data: { details, species },
      fetchPokemonDetails: () => {},
      match: {
        params: {
          id: 1
        }
      }
    })
      .find(TypeBadge)
      .length;

    expect(count).toBe(details.types.length);
  });

  it('renders the correct flavor text entry', () => {
    const { details, species } = pokemonJson;
    const flavorTextEntry = getWrapper({
      data: { details, species },
      fetchPokemonDetails: () => {},
      match: {
        params: {
          id: 1
        }
      }
    })
      .find('[data-test="flavor-text-entry"]')
      .text();

    const [first] = getFlavorTextEntries(species.flavor_text_entries);

    expect(flavorTextEntry).toBe(first.flavor_text);
  });

  it('renders the egg groups', () => {
    const { details, species } = pokemonJson;
    const wrapper = getWrapper({
      data: { details, species },
      fetchPokemonDetails: () => {},
      match: {
        params: {
          id: 1
        }
      }
    })
      .find('[data-test="egg-groups"]');

    const title = wrapper
      .find('[data-test="title"]')
      .text();

    const eggGroupText = wrapper
      .find('[data-test="egg-group-text"]')
      .text();

    expect(title).toBe('EGG GROUPS');
    expect(eggGroupText).toBe('Plant, Monster');
  });
});
