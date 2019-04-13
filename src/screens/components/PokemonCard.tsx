import React from 'react';
import { PokemonPreview } from '../../store/PokemonPreviewList';
import {
  Card,
  CardActionArea,
  Typography,
  CardMedia,
  CardContent,
  CardActions
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { TypeBadge } from '../shared/TypeBadge';
import { colors } from '../shared/colors';

type PokemonCardProps = {
  pokemon: PokemonPreview;
};
export const PokemonCard: React.FunctionComponent<PokemonCardProps> = ({
  pokemon
}) => (
  <Link to={`/pokemon/${pokemon.id}`} style={{ textDecoration: 'none' }}>
    <Card
      style={{
        backgroundColor: colors.secondary,
        height: '100%'
      }}
    >
      <CardActionArea>
        <Typography
          variant="display1"
          style={{
            padding: '10px'
          }}
        >
          {pokemon.id}
        </Typography>
        <CardMedia
          image={`pokemon-icons/${pokemon.id}.png`}
          title={pokemon.name}
          component="img"
          style={{
            padding: '10px 20px'
          }}
        />
        <CardContent>
          <Typography variant="headline" noWrap>
            {pokemon.name}
          </Typography>
        </CardContent>
        <CardActions>
          <TypeBadge types={pokemon.types} style={{ marginRight: '5px' }} />
        </CardActions>
      </CardActionArea>
    </Card>
  </Link>
);
