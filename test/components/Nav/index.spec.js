import Nav from '/components/Nav';
import { mountWithRouter } from '/wrapper';

const getWrapper = mountWithRouter(Nav);

describe('Nav', () => {
  it('has a link to view all pokemon', () => {
    const link = getWrapper()
      .find('[data-test="all-pokemon-link"]')
      .last();

    expect(link.length).toBe(1);
    expect(link.text()).toBe('All Pokemon');
  });
});
