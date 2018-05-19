import PokemonPreviewList from '/features/PokemonPreviewList';

describe('PokemonPreviewList', () => {
  it('should exist', () => {
    expect(PokemonPreviewList).toBeTruthy();
  });

  it('should be a function', () => {
    expect(typeof PokemonPreviewList).toBe('function');
  });
});
