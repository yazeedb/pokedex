import getRatingWidth from '/components/StatMeter/getRatingWidth';

describe('getRatingWidth', () => {
  it('calculates fill length according to rating/element width', () => {
    const result = getRatingWidth(50, {
      offsetWidth: 100
    });

    expect(result).toBe(19.61);
  });
});
