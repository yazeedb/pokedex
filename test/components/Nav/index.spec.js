import Nav from '/components/Nav';
import { mountWrapper } from '/wrapper';

const getWrapper = mountWrapper(Nav);
const headerSelector = '[data-test="header"]';

describe('Nav', () => {
  it('has a header with default text', () => {
    const wrapper = getWrapper();
    const header = wrapper.find(headerSelector);

    expect(header.text()).toBe('Default Title');
  });

  it('allows setting header text via children prop', () => {
    const wrapper = getWrapper({
      children: 'ALL POKEMON'
    });
    const header = wrapper.find(headerSelector);

    expect(header.text()).toBe('ALL POKEMON');
  });
});
