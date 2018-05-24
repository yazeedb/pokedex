import getFlavorTextEntries from '/helpers/getFlavorTextEntries';

const flavorTextEntries = [{
  version: {
    url: 'https://pokeapi.co/api/v2/version/26/',
    name: 'alpha-sapphire'
  },
  flavor_text: 'Do not pick this one',
  language: {
    url: 'https://pokeapi.co/api/v2/language/11/',
    name: 'ja'
  }
}, {
  version: {
    url: 'https://pokeapi.co/api/v2/version/26/',
    name: 'alpha-sapphire'
  },
  flavor_text: 'Pick this one',
  language: {
    url: 'https://pokeapi.co/api/v2/language/9/',
    name: 'en'
  }
}, {
  version: {
    url: 'https://pokeapi.co/api/v2/version/26/',
    name: 'alpha-sapphire'
  },
  flavor_text: 'Also pick this one',
  language: {
    url: 'https://pokeapi.co/api/v2/language/8/',
    name: 'en'
  }
}
];

describe('getFlavorTextEntries', () => {
  it('returns all english entries', () => {
    const result = getFlavorTextEntries(flavorTextEntries);

    expect(result).toEqual([{
      version: {
        url: 'https://pokeapi.co/api/v2/version/26/',
        name: 'alpha-sapphire'
      },
      flavor_text: 'Pick this one',
      language: {
        url: 'https://pokeapi.co/api/v2/language/9/',
        name: 'en'
      }
    }, {
      version: {
        url: 'https://pokeapi.co/api/v2/version/26/',
        name: 'alpha-sapphire'
      },
      flavor_text: 'Also pick this one',
      language: {
        url: 'https://pokeapi.co/api/v2/language/8/',
        name: 'en'
      }
    }]);
  });
});
