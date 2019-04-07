import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, TextField } from '@material-ui/core';
import * as appTitle from '../store/AppTitle';
import { RootState } from '../store/rootReducer';
import * as pokemonPreviewList from '../store/PokemonPreviewList';
import { FetchStatuses } from '../store/interfaces/FetchStatuses';
import { Loading } from './shared/Loading';
import { AppBar } from './shared/AppBar';
import { PokemonCard } from './components/PokemonCard';

type PokemonPreviewListProps = {
  state: {
    pokemonPreviewList: pokemonPreviewList.PokemonListState;
    title: appTitle.TitleState;
  };
  actions: {
    pokemonPreviewList: typeof pokemonPreviewList.actions;
    setTitle: typeof appTitle.setTitle;
  };
};

const Component: React.FunctionComponent<PokemonPreviewListProps> = React.memo(
  ({ state, actions }) => {
    React.useEffect(() => {
      actions.pokemonPreviewList.fetchPokemonList(null);
      actions.setTitle('All Pokemon');
    }, []);

    const fetching =
      state.pokemonPreviewList.fetchStatus === FetchStatuses.fetching;

    return (
      <>
        <AppBar style={{ textAlign: 'center', padding: '20px 0' }}>
          {state.title.title}
        </AppBar>
        <Loading show={fetching} message={state.pokemonPreviewList.message}>
          <TextField
            id="search-all-pokemon"
            style={{ margin: '20px 0', padding: '0 20px' }}
            placeholder="Search"
            fullWidth
            margin="normal"
            value={state.pokemonPreviewList.searchValue}
            onChange={(event) => {
              actions.pokemonPreviewList.changeSearchValue(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                actions.pokemonPreviewList.resetSearchValue(null);
              }
            }}
          />
          <Grid
            container
            spacing={24}
            style={{ padding: 24 }}
            direction="row"
            justify="center"
          >
            {state.pokemonPreviewList.pokemonPreviewList
              .filter((pokemon) =>
                pokemon.name
                  .toLowerCase()
                  .includes(
                    state.pokemonPreviewList.searchValue.toLowerCase().trim()
                  )
              )
              .map((pokemon) => (
                <PokemonCard pokemon={pokemon} key={pokemon.name} />
              ))}
          </Grid>
        </Loading>
      </>
    );
  }
);

const withRedux = connect(
  (state: RootState) => ({
    state: {
      pokemonPreviewList: state.pokemonPreviewList,
      title: state.title
    }
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
