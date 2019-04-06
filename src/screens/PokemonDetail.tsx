import React from 'react';
import * as pokemonDetail from '../store/PokemonDetail';
import * as appTitle from '../store/AppTitle';
import { PokemonDetailState } from '../store/PokemonDetail';
import { connect } from 'react-redux';
import { partition } from 'ramda';
import { RootState } from '../store/rootReducer';
import { bindActionCreators } from 'redux';
import { FetchStatuses } from '../store/interfaces/FetchStatuses';
import { Loading } from './shared/Loading';
import { Chip, Typography, Grid } from '@material-ui/core';
import { typesToColors } from './shared/colors';

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

const commonWrapperStyles = {
  padding: '20px 0'
};

const oddWrapperBackgroundColor = '#F2F2F2';

const renderWhenReady = (state: PokemonDetailState) => {
  if (!state.pokemonDetail) {
    return null;
  }

  const { details, species } = state.pokemonDetail;

  return (
    <div
      style={{
        textAlign: 'center'
      }}
    >
      <div
        style={{
          backgroundColor: oddWrapperBackgroundColor,
          ...commonWrapperStyles
        }}
      >
        <img src={`/pokemon-icons/${details.id}.png`} width="200px" />
      </div>
      <div style={commonWrapperStyles}>
        {details.types
          .map((type) => type.type.name)
          .map((typeName) => (
            <Chip
              label={typeName.toUpperCase()}
              key={typeName}
              style={{
                backgroundColor: typesToColors[typeName],
                color: 'white',
                marginRight: '10px'
              }}
            />
          ))}

        <Typography
          variant="h3"
          style={{ textTransform: 'capitalize', marginTop: '15px' }}
        >
          {details.name}
        </Typography>
        <Typography variant="h6" style={{ marginBottom: '15px' }}>
          #{details.id} {species.genus}
        </Typography>

        <Typography
          variant="h6"
          style={{ maxWidth: '900px', margin: '0 auto' }}
        >
          {species.flavor_text}
        </Typography>
      </div>
      <Grid
        container
        spacing={0}
        xs={12}
        style={{
          backgroundColor: oddWrapperBackgroundColor,
          ...commonWrapperStyles
        }}
      >
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Height : {details.height / 10} m</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">
            Weight : {details.weight / 10} kg
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" style={{ textTransform: 'capitalize' }}>
            Generation : {species.generation.name}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6" style={{ textTransform: 'capitalize' }}>
            Egg Groups : {species.egg_groups.map((e) => e.name).join(', ')}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6">
            Capture Rate : {species.capture_rate}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6" style={{ textTransform: 'capitalize' }}>
            Abilities :{' '}
            {details.abilities
              .map((ability) => ability.ability.name)
              .join(', ')}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
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
      {renderWhenReady(state)}
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
