import getRatingColor from '/components/StatMeter/getRatingColor';

describe('getRatingColor', () => {
  it('returns "poor" if rating 50 or lower', () => {
    const allPass = [1, 10, 20, 30, 40, 49]
      .map(getRatingColor)
      .every(({ name }) => name === 'poor');

    expect(allPass).toBe(true);
  });

  it('returns "belowAverage" if rating between 51 and 75', () => {
    const allPass = [51, 60, 75]
      .map(getRatingColor)
      .every(({ name }) => name === 'belowAverage');

    expect(allPass).toBe(true);
  });

  it('returns "average" if rating between 76 and 100', () => {
    const allPass = [76, 80, 100]
      .map(getRatingColor)
      .every(({ name }) => name === 'average');

    expect(allPass).toBe(true);
  });

  it('returns "aboveAverage" if rating between 101 and 150', () => {
    const allPass = [101, 125, 150]
      .map(getRatingColor)
      .every(({ name }) => name === 'aboveAverage');

    expect(allPass).toBe(true);
  });

  it('returns "great" if rating 151 or higher', () => {
    const allPass = [151, 200, 255, 30000000]
      .map(getRatingColor)
      .every(({ name }) => name === 'great');

    expect(allPass).toBe(true);
  });
});
