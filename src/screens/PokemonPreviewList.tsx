import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  CardActions,
  Button,
  CardActionArea
} from '@material-ui/core';
import * as appTitle from '../store/AppTitle';
import { RootState } from '../store/rootReducer';
import * as pokemonPreviewList from '../store/PokemonPreviewList';
import { typesToColors } from './shared/colors';

type PokemonPreviewListProps = {
  state: pokemonPreviewList.PokemonListState;
  actions: {
    pokemonPreviewList: typeof pokemonPreviewList.actions;
    setTitle: typeof appTitle.setTitle;
  };
};

const Component: React.FunctionComponent<PokemonPreviewListProps> = ({
  state,
  actions
}) => {
  React.useEffect(() => {
    actions.pokemonPreviewList.fetchPokemonList(null);
    actions.setTitle('All Pokemon');
  }, []);

  return (
    <Grid container spacing={24} style={{ padding: 24 }}>
      <Grid item xs={12}>
        <Grid container spacing={24} direction="row">
          {state.pokemonPreviewList.slice(0, 50).map((pokemon) => (
            <Grid item={true} xs={8} sm={3} lg={2} xl={1}>
              <Card
                key={pokemon.name}
                style={{
                  backgroundColor: '#F2F2F2'
                }}
              >
                <CardActionArea>
                  <CardMedia
                    image={`pokemon-icons/${pokemon.id}.png`}
                    title={pokemon.name}
                    component="img"
                    style={{
                      padding: '10px 20px'
                    }}
                  />
                  <CardContent>
                    <Typography gutterBottom={true} variant="headline">
                      {pokemon.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {pokemon.types.map((type) => (
                      <Button
                        size="small"
                        key={type}
                        style={{
                          backgroundColor: typesToColors[type],
                          fontWeight: 'bold',
                          color: 'white'
                        }}
                      >
                        {type}
                      </Button>
                    ))}
                  </CardActions>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

const withRedux = connect(
  (state: RootState) => ({
    state: state.pokemonPreviewList
  }),
  (dispatch) => ({
    actions: {
      pokemonPreviewList: bindActionCreators(
        pokemonPreviewList.actions,
        dispatch
      ),
      setTitle: bindActionCreators(appTitle.setTitle, dispatch)
    }
  })
);

export const PokemonPreviewList = withRedux(Component);
