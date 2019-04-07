import React from 'react';
import { Chip } from '@material-ui/core';
import { typesToColors } from './colors';

type TypeBadgeProps = {
  types: string[];
  style?: React.CSSProperties;
};

export const TypeBadge: React.FunctionComponent<TypeBadgeProps> = ({
  types,
  style = {}
}) => (
  <>
    {types
      .sort((a, b) => (a < b ? -1 : 1))
      .map((type) => (
        <Chip
          label={type.toUpperCase()}
          key={type}
          style={{
            backgroundColor: typesToColors[type],
            color: 'white',
            fontWeight: 'bold',
            ...style
          }}
        />
      ))}
  </>
);
