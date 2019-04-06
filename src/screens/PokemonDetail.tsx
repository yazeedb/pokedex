import React from 'react';
import * as pokemonDetail from '../store/PokemonDetail';
import * as appTitle from '../store/AppTitle';
import { PokemonDetailState } from '../store/PokemonDetail';
import { connect } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { bindActionCreators } from 'redux';
import { FetchStatuses } from '../store/interfaces/FetchStatuses';
import { Loading } from './shared/Loading';
import { Chip, Typography } from '@material-ui/core';
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

const calculateGenderRatio = (genderRate: number) => {
  if (genderRate === 1) {
    return {
      maleRatio: 100
    };
  }

  const femaleRatio = 1 - genderRate * 100;

  return {
    maleRatio: genderRate * 100,
    femaleRatio
  };
};

const renderWhenReady = (state: PokemonDetailState) => {
  if (!state.pokemonDetail) {
    return null;
  }

  const { details, species } = state.pokemonDetail;
  const genderRatio = calculateGenderRatio(species.gender_rate);

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
        <Typography variant="h6">
          #{details.id} {species.genus}
        </Typography>
      </div>
      <div
        style={{
          backgroundColor: oddWrapperBackgroundColor,
          ...commonWrapperStyles
        }}
      >
        <Typography variant="h6" style={{ textTransform: 'capitalize' }}>
          Generation : {species.generation.name}
        </Typography>
        <Typography variant="h6" style={{ textTransform: 'capitalize' }}>
          Egg Groups : {species.egg_groups.map((e) => e.name).join(', ')}
        </Typography>
        <Typography variant="h6">
          Capture Rate : {species.capture_rate}
        </Typography>

        {/* 
        
        TODO: properly calculate gender ratio.
        Will need a map { number: gender } or something
        <Typography variant="h6">
          Gender Rate : {genderRatio.maleRatio}% Male
          {genderRatio.femaleRatio && ` / ${genderRatio.femaleRatio}% Female`}
        </Typography> */}
      </div>
      <div style={commonWrapperStyles}>
        <Typography
          variant="h5"
          style={{ textDecoration: 'underline', marginBottom: '10px' }}
        >
          POKEDEX ENTRY
        </Typography>
        <Typography
          variant="h6"
          style={{ maxWidth: '900px', margin: '0 auto' }}
        >
          {species.flavor_text}
        </Typography>
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
