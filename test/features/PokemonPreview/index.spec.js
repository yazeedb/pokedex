import PokemonPreview from '/features/PokemonPreview';
import TypeBadge from '/components/TypeBadge';
import { mountWithRouter } from '/wrapper';

const getWrapper = mountWithRouter(PokemonPreview);

describe('PokemonPreview', () => {
  it('renders a wrapper linking to Pokemon\'s detail page', () => {
    const href = getWrapper({
      id: 1,
      spriteUrl: 'pokemon/icons/1.png',
      name: 'bulbasaur',
      types: []
    })
      .find('[data-test="detail-link"]')
      .last()
      .prop('href');

    expect(href).toBe('/detail/1');
  });

  it('renders a Pokemon\'s sprite', () => {
    const img = getWrapper({
      id: 1,
      spriteUrl: 'pokemon/icons/1.png',
      name: 'bulbasaur',
      types: []
    })
      .find('[data-test="sprite"]');

    expect(img.prop('src')).toBe('pokemon/icons/1.png');
    expect(img.prop('alt')).toBe('bulbasaur');
  });

  it('renders a pokemon\'s capitalized name', () => {
    const name = getWrapper({
      id: 1,
      name: 'bulbasaur',
      types: []
    })
      .find('[data-test="name"]');

    expect(name.text()).toBe('Bulbasaur');
  });

  it('renders a TypeBadge for each type', () => {
    const elementCount = getWrapper({
      id: 1,
      spriteUrl: 'pokemon/icons/1.png',
      name: 'bulbasaur',
      types: ['Grass', 'Poison']
    })
      .find(TypeBadge)
      .length;

    expect(elementCount).toBe(2);
  });
});
