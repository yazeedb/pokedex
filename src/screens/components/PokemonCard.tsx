import React from 'react';
import { PokemonPreview } from '../../store/PokemonPreviewList';
import {
  Grid,
  Card,
  CardActionArea,
  Typography,
  CardMedia,
  CardContent,
  CardActions
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { TypeBadge } from '../shared/TypeBadge';

type PokemonCardProps = {
  pokemon: PokemonPreview;
};
export const PokemonCard: React.FunctionComponent<
  PokemonCardProps
> = React.memo(({ pokemon }) => (
  <Grid item={true} xs={8} sm={4} md={3} lg={2} key={pokemon.name}>
    <Link to={`/pokemon/${pokemon.id}`} style={{ textDecoration: 'none' }}>
      <Card
        style={{
          backgroundColor: '#F2F2F2'
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
          {/* <LazyLoad> */}
          <CardMedia
            image={`pokemon-icons/${pokemon.id}.png`}
            title={pokemon.name}
            component="img"
            style={{
              padding: '10px 20px'
            }}
          />
          {/* </LazyLoad> */}
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
  </Grid>
));
