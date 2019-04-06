import React from 'react';
import { PokemonMove } from '../../store/interfaces/PokemonDetail';

type MoveListProps = {
  moves: PokemonMove[];
};

export const MoveList: React.FunctionComponent<MoveListProps> = ({ moves }) => {
  return <div />;
};
