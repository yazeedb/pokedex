import PokemonPreview from '/features/PokemonPreview';
import { mountWrapper } from '/wrapper';

const getWrapper = mountWrapper(PokemonPreview);

describe('PokemonPreview', () => {
  it('renders a Pokemon\'s sprite', () => {
    const img = getWrapper({
      spriteUrl: 'pokemon/icons/1.png',
      name: 'bulbasaur'
    })
      .find('[data-test="sprite"]');

    expect(img.prop('src')).toBe('pokemon/icons/1.png');
    expect(img.prop('alt')).toBe('bulbasaur');
  });

  it('renders a pokemon\'s capitalized name', () => {
    const name = getWrapper({ name: 'bulbasaur' })
      .find('[data-test="name"]');

    expect(name.text()).toBe('Bulbasaur');
  });
});
