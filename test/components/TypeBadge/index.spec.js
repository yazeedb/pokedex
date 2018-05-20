import TypeBadge from '/components/TypeBadge';
import { mountWrapper } from '/wrapper';

const getWrapper = mountWrapper(TypeBadge);

describe('TypeBadge', () => {
  it('renders an uppercased type', () => {
    const type = getWrapper({ type: 'grass' })
      .find('[data-test="type"]');

    expect(type.text()).toBe('GRASS');
  });

  it('applies the correct type className', () => {
    const type = getWrapper({ type: 'grass' })
      .find('[data-test="type"]');

    expect(type.prop('className')).toBe('type-badge type-grass');
  });

  it('makes className lowercase', () => {
    const type = getWrapper({ type: 'GRaSs' })
      .find('[data-test="type"]');

    expect(type.prop('className')).toBe('type-badge type-grass');
  });
});
