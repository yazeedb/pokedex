import upperFirst from '/helpers/upperFirst';

describe('upperFirst', () => {
  it('capitalizes a string', () => {
    const result = upperFirst('hello');

    expect(result).toBe('Hello');
  });

  it('does nothing if string is already capitalized', () => {
    const result = upperFirst('Hello');

    expect(result).toBe('Hello');
  });
});
