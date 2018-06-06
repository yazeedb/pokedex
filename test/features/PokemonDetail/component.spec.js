import Component from '/features/PokemonDetail/component';
import TypeBadge from '/components/TypeBadge';
import Stats from '/components/Stats';
import { mountWithRouter } from '/wrapper';
import pokemonJson from '/api/data/test-pokemon.json';
import getFlavorTextEntries from '/helpers/getFlavorTextEntries';
import upperFirst from '/helpers/upperFirst';

const getWrapper = mountWithRouter(Component);

describe('PokemonDetail', () => {
  it('calls fetchPokemonDetails with ID on componentDidMount', () => {
    const fetchPokemonDetails = jest.fn();

    getWrapper({
      data: pokemonJson,
      fetchPokemonDetails,
      setTitle: () => {},
      match: {
        params: {
          id: 1
        }
      }
    });

    expect(fetchPokemonDetails.mock.calls.length).toBe(1);
    expect(fetchPokemonDetails.mock.calls[0][0]).toBe(1);
  });

  it('calls setTitle on componentDidMount', () => {
    const setTitle = jest.fn();

    getWrapper({
      setTitle,
      data: pokemonJson,
      fetchPokemonDetails: () => {},
      match: {
        params: {
          id: 1
        }
      }
    });

    expect(setTitle.mock.calls.length).toBe(1);
    expect(setTitle.mock.calls[0][0]).toBe('POKEMON DETAIL');
  });

  it('shows loading indicator if fetching', () => {
    const loading = getWrapper({
      fetching: true,
      data: { details: {}, species: {} },
      fetchPokemonDetails: () => {},
      setTitle: () => {},
      match: {
        params: {
          id: 1
        }
      }
    })
      .find('[data-test="loading"]');

    expect(loading.length).toBe(1);
  });

  it('renders a previous arrow if not first pokemon', () => {
    const { details, species } = pokemonJson;
    const id = 2;

    const previousLink = getWrapper({
      data: {
        details: { ...details, id },
        species
      },
      fetchPokemonDetails: () => {},
      setTitle: () => {},
      match: {
        params: {
          id: 1
        }
      }
    })
      .find('[data-test="previous-link"]')
      .last();

    expect(previousLink.length).toBe(1);
    expect(previousLink.prop('href')).toBe(`/${id - 1}`);
  });

  it('does not render a previous arrow if first pokemon', () => {
    const { details, species } = pokemonJson;

    const previousLink = getWrapper({
      data: { details, species },
      fetchPokemonDetails: () => {},
      setTitle: () => {},
      match: {
        params: {
          id: 1
        }
      }
    })
      .find('[data-test="previous-link"]');

    expect(previousLink.length).toBe(0);
  });

  it('renders a next arrow', () => {
    const { details, species } = pokemonJson;

    const nextLink = getWrapper({
      data: { details, species },
      fetchPokemonDetails: () => {},
      setTitle: () => {},
      match: {
        params: {
          id: 1
        }
      }
    })
      .find('[data-test="next-link"]')
      .last();

    expect(nextLink.length).toBe(1);
    expect(nextLink.prop('href')).toBe(`/${details.id + 1}`);
  });

  it('renders the pokemon\'s sugimori image', () => {
    const { details, species } = pokemonJson;

    const img = getWrapper({
      data: { details, species },
      fetchPokemonDetails: () => {},
      setTitle: () => {},
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
      setTitle: () => {},
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
      setTitle: () => {},
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
      setTitle: () => {},
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
      setTitle: () => {},
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
      setTitle: () => {},
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

  it('renders the normal/shiny sprites', () => {
    const { details, species } = pokemonJson;
    const wrapper = getWrapper({
      data: { details, species },
      fetchPokemonDetails: () => {},
      setTitle: () => {},
      match: {
        params: {
          id: 1
        }
      }
    })
      .find('[data-test="sprites"]');

    const title = wrapper
      .find('[data-test="title"]')
      .text();

    const [normal, shiny] = wrapper
      .children('div')
      .map(node => ({
        imgSrc: node.find('[data-test="sprite"]').prop('src'),
        label: node.find('[data-test="label"]').text()
      }));

    expect(title).toBe('SPRITES');
    expect(normal).toEqual({
      imgSrc: 'pokemon/normalGifs/bulbasaur.gif',
      label: 'Normal'
    });
    expect(shiny).toEqual({
      imgSrc: 'pokemon/shinyGifs/bulbasaur.gif',
      label: 'Shiny'
    });
  });

  it('renders the base stats', () => {
    const { details, species } = pokemonJson;
    const wrapper = getWrapper({
      data: { details, species },
      fetchPokemonDetails: () => {},
      setTitle: () => {},
      match: {
        params: {
          id: 1
        }
      }
    })
      .find('[data-test="base-stats"]');

    const title = wrapper
      .find('[data-test="title"]')
      .text();

    const StatsComponent = wrapper.find(Stats);

    expect(title).toBe('BASE STATS');
    expect(StatsComponent.length).toBe(1);
  });
});
