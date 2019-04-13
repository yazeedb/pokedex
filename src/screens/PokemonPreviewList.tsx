import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TextField, withStyles } from '@material-ui/core';
import { AutoSizer, List, WindowScroller } from 'react-virtualized';
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
  classes: any;
};

const ITEM_WIDTH = 220;
const ITEM_HEIGHT = 400;

const styles = (theme: any) => ({
  Root: {
    padding: '0px 25px',
    margin: '20px 0',
    justifyContent: 'center'
  },
  Row: {
    display: 'flex',
    justifyContent: 'center'
  },
  Item: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    margin: '0 15px'
  },
  Card: {
    height: '100%'
  }
});

const Component: React.FunctionComponent<PokemonPreviewListProps> = React.memo(
  ({ state, actions, classes }) => {
    React.useEffect(() => {
      actions.pokemonPreviewList.fetchPokemonList(null);
      actions.setTitle('All Pokemon');
    }, []);

    const fetching =
      state.pokemonPreviewList.fetchStatus === FetchStatuses.fetching;

    const matchingPokemon = state.pokemonPreviewList.pokemonPreviewList.filter(
      (pokemon) =>
        pokemon.name
          .toLowerCase()
          .includes(state.pokemonPreviewList.searchValue.toLowerCase().trim())
    );

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
          <div className={classes.Root}>
            <WindowScroller>
              {({ height }) => (
                <AutoSizer disableHeight>
                  {({ width }) => {
                    const itemsPerRow = Math.floor(width / ITEM_WIDTH) || 1;
                    const rowCount = Math.ceil(
                      matchingPokemon.length / itemsPerRow
                    );

                    return (
                      <div>
                        <List
                          className={classes.Root}
                          width={width}
                          height={height}
                          rowCount={rowCount}
                          rowHeight={ITEM_WIDTH * 2}
                          rowRenderer={({ index, key, style }) => {
                            const fromIndex = index * itemsPerRow;
                            const toIndex = Math.min(
                              fromIndex + itemsPerRow,
                              matchingPokemon.length
                            );

                            const items = matchingPokemon
                              .slice(fromIndex, toIndex)
                              .map((pokemon) => (
                                <div
                                  className={classes.Item}
                                  key={pokemon.name}
                                >
                                  <PokemonCard pokemon={pokemon} />
                                </div>
                              ));

                            return (
                              <div
                                className={classes.Row}
                                key={key}
                                style={style}
                              >
                                {items}
                              </div>
                            );
                          }}
                        />
                      </div>
                    );
                  }}
                </AutoSizer>
              )}
            </WindowScroller>
          </div>
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

// @ts-ignore
export const PokemonPreviewList = withStyles(styles)(withRedux(Component));
