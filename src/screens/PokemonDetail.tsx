import React from 'react';
import * as pokemonDetail from '../store/PokemonDetail';
import * as appTitle from '../store/AppTitle';
import { PokemonDetailState } from '../store/PokemonDetail';
import { connect } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { bindActionCreators } from 'redux';
import { FetchStatuses } from '../store/interfaces/FetchStatuses';
import { Loading } from './shared/Loading';

type PokemonDetailProps = {
  state: PokemonDetailState;
  actions: {
    pokemonDetail: typeof pokemonDetail.actions;
    setTitle: typeof appTitle.setTitle;
  };
  match: {
    params: {
      id: string;
    };
  };
};

const Component: React.FunctionComponent<PokemonDetailProps> = ({
  state,
  actions,
  match
}) => {
  React.useEffect(() => {
    actions.setTitle('Pokemon Detail');
    actions.pokemonDetail.fetchPokemonDetail(parseInt(match.params.id, 10));
  }, [match.params.id]);

  const fetching = state.fetchStatus === FetchStatuses.fetching;

  return (
    <Loading show={fetching} message={state.message}>
      <div>Hello World</div>
    </Loading>
  );
};

const withRedux = connect(
  (state: RootState) => ({
    state: state.pokemonDetail
  }),
  (dispatch) => ({
    actions: {
      pokemonDetail: bindActionCreators(pokemonDetail.actions, dispatch),
      setTitle: bindActionCreators(appTitle.setTitle, dispatch)
    }
  })
);

export const PokemonDetail = withRedux(Component);
