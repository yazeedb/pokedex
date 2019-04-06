import React from 'react';
import * as pokemonDetail from '../store/PokemonDetail';
import * as appTitle from '../store/AppTitle';
import { PokemonDetailState } from '../store/PokemonDetail';
import { connect } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { bindActionCreators } from 'redux';
import { FetchStatuses } from '../store/interfaces/FetchStatuses';
import { Loading } from './shared/Loading';
import { Chip, Typography, Grid } from '@material-ui/core';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
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
  padding: '20px'
};

const oddWrapperBackgroundColor = '#F2F2F2';

const renderWhenReady = (state: PokemonDetailState) => {
  const isSmBreakpoint = useMediaQuery('(max-width:600px)');

  if (!state.pokemonDetail) {
    return null;
  }

  const { details, species } = state.pokemonDetail;

  return (
    <div>
      <div
        style={{
          backgroundColor: oddWrapperBackgroundColor,
          textAlign: 'center',
          ...commonWrapperStyles
        }}
      >
        <img src={`/pokemon-icons/${details.id}.png`} width="200px" />
      </div>
      <div
        style={{
          ...commonWrapperStyles,
          maxWidth: '960px',
          margin: '0 auto',
          padding: '30px 10px',
          textAlign: 'center'
        }}
      >
        <Typography
          variant="h3"
          style={{ textTransform: 'capitalize', marginTop: '15px' }}
        >
          {details.name}
        </Typography>
        <Typography variant="h6" style={{ marginBottom: '15px' }}>
          #{details.id} {species.genus}
        </Typography>

        {details.types
          .map((type) => type.type.name)
          .map((typeName) => (
            <Chip
              label={typeName.toUpperCase()}
              key={typeName}
              style={{
                backgroundColor: typesToColors[typeName],
                color: 'white',
                marginRight: '10px',
                fontWeight: 'bold'
              }}
            />
          ))}

        <Typography variant="h6" style={{ marginTop: '15px' }}>
          {species.flavor_text}
        </Typography>
      </div>
      <div
        style={{
          ...commonWrapperStyles,
          backgroundColor: oddWrapperBackgroundColor
        }}
      >
        <Grid
          container
          style={{
            ...commonWrapperStyles,
            maxWidth: '960px',
            margin: '0 auto',
            textAlign: isSmBreakpoint ? 'center' : 'initial'
          }}
        >
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">
              <b>Height</b> : {details.height / 10} m
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">
              <b>Weight</b> : {details.weight / 10} kg
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" style={{ textTransform: 'capitalize' }}>
              <b>Generation</b> : {species.generation.name}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h6" style={{ textTransform: 'capitalize' }}>
              <b>Egg Groups</b> :{' '}
              {species.egg_groups.map((e) => e.name).join(', ')}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h6">
              <b>Capture Rate</b> : {species.capture_rate}%
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h6">
              <b>Base Experience</b> : {details.base_experience}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h6">
              <b>Base Happiness</b> : {species.base_happiness}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} style={{ textTransform: 'capitalize' }}>
            <Typography variant="h6">
              <b>Shape</b> : {species.shape.name}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} style={{ textTransform: 'capitalize' }}>
            <Typography variant="h6">
              <b>Color</b> : {species.color.name}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h6" style={{ textTransform: 'capitalize' }}>
              <b>Abilities</b> :{' '}
              {details.abilities
                .map((ability) => ability.ability.name)
                .join(', ')}
            </Typography>
          </Grid>
        </Grid>
      </div>
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
