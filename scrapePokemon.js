const colorsToTypes = {
  '#78C850': 'grass',
  '#A040A0': 'poison',
  '#F08030': 'fire',
  '#A890F0': 'flying',
  '#6890F0': 'water',
  '#A8B820': 'bug',
  '#A8A878': 'normal',
  '#F8D030': 'electric',
  '#E0C068': 'ground',
  '#EE99AC': 'fairy',
  '#C03028': 'fighting',
  '#F85888': 'psychic',
  '#B8A038': 'rock',
  '#B8B8D0': 'steel',
  '#98D8D8': 'ice',
  '#705898': 'ghost',
  '#7038F8': 'dragon',
  '#705848': 'dark'
};

const scrapePokemon = (document) =>
  Array.from(document.querySelectorAll('#monsters-list li')).map(
    (li, index) => ({
      id: index + 1,
      name: li.querySelector('span').innerHTML,
      types: li
        .getAttribute('style')
        .match(/(#\w+)/g)
        .map((color) => colorsToTypes[color])
    })
  );

exports.scrapePokemon = scrapePokemon;
