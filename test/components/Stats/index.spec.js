import Stats from '/components/Stats';
import { mountWrapper } from '/wrapper';
import stats from '/mockJson/stats.json';

const getWrapper = mountWrapper(Stats);

describe('stats', () => {
  it('renders the stat names', () => {
    const statNames = getWrapper({ stats })
      .find('[data-test="stat-name"]')
      .map(node => node.text());

    expect(statNames).toEqual([
      'HP',
      'ATK',
      'DEF',
      'SPA',
      'SPD',
      'SPE'
    ]);
  });
});
