import Home from '/features/Home';

describe('Home', () => {
  it('should exist', () => {
    expect(Home).toBeTruthy();
  });

  it('should be a function', () => {
    expect(typeof Home).toBe('function');
  });
});
