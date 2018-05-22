import findEnglishGenus from '/features/PokemonDetail/findEnglishGenus';

const species = {
  genera: [
    {
      genus: 'Seed Pokémon',
      language: {
        url: 'https://pokeapi.co/api/v2/language/9/',
        name: 'en'
      }
    },
    {
      genus: 'Pokémon Seme',
      language: {
        url: 'https://pokeapi.co/api/v2/language/8/',
        name: 'it'
      }
    },
    {
      genus: 'Pokémon Semilla',
      language: {
        url: 'https://pokeapi.co/api/v2/language/7/',
        name: 'es'
      }
    }
  ]
};

describe('findEnglishGenus', () => {
  it('returns the english genus', () => {
    const result = findEnglishGenus(species);

    expect(result).toBe('Seed Pokémon');
  });

  it('returns empty string if genera does not exist', () => {
    const result = findEnglishGenus({});

    expect(result).toBe('');
  });
});
