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
  CardActionArea,
  Chip,
  Input,
  TextField
} from '@material-ui/core';
import * as appTitle from '../store/AppTitle';
import { RootState } from '../store/rootReducer';
import * as pokemonPreviewList from '../store/PokemonPreviewList';
import { typesToColors } from './shared/colors';
import { Link } from 'react-router-dom';
import { FetchStatuses } from '../store/interfaces/FetchStatuses';
import { Loading } from './shared/Loading';

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

  const fetching = state.fetchStatus === FetchStatuses.fetching;

  return (
    <Loading show={fetching} message={state.message}>
      <TextField
        id="search-all-pokemon"
        style={{ margin: 8 }}
        placeholder="Search"
        fullWidth
        margin="normal"
      />
      <Grid container spacing={24} style={{ padding: 24 }}>
        <Grid item xs={12}>
          <Grid container spacing={24} direction="row" justify="center">
            {state.pokemonPreviewList.map((pokemon) => (
              <Grid item={true} xs={8} sm={4} md={3} lg={2} key={pokemon.name}>
                <Link
                  to={`/pokemon/${pokemon.id}`}
                  style={{ textDecoration: 'none' }}
                >
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
                        {pokemon.types.map((type) => (
                          <Chip
                            label={type}
                            key={type}
                            style={{
                              backgroundColor: typesToColors[type],
                              color: 'white'
                            }}
                          />
                        ))}
                      </CardActions>
                    </CardActionArea>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Loading>
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
