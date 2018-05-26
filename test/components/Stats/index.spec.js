import Stats from '/components/Stats';
import { mountWrapper } from '/wrapper';
import statsJson from '/mockJson/stats.json';

const stats = [...statsJson].reverse();
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

  it('renders the stat points', () => {
    const statPoints = getWrapper({ stats })
      .find('[data-test="stat-point"]')
      .map(node => node.text());

    expect(statPoints).toEqual([
      '45',
      '49',
      '49',
      '65',
      '65',
      '45'
    ]);
  });

  it('renders the total points', () => {
    const total = getWrapper({ stats })
      .find('[data-test="total"]')
      .text();

    expect(total).toBe('TOTAL 318');
  });
});
