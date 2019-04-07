const { evolve, map, omit, pipe, prop } = require('ramda');

const condenseMoves = map(
  evolve({
    version_group_details: prop(0)
  })
);

module.exports = pipe(
  omit(['game_indices']),
  evolve({
    moves: condenseMoves
  })
);
