import React from 'react';
import * as pokemonDetail from '../store/PokemonDetail';
import * as appTitle from '../store/AppTitle';
import { PokemonDetailState } from '../store/PokemonDetail';
import { connect } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { bindActionCreators } from 'redux';
import { partition } from 'ramda';
import { FetchStatuses } from '../store/interfaces/FetchStatuses';
import { Loading } from './shared/Loading';
import { Typography, Grid, Toolbar, IconButton } from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBackIos';
import ForwardIcon from '@material-ui/icons/ArrowForwardIos';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import { PokemonMove } from '../store/interfaces/PokemonDetail';
import { TypeBadge } from './shared/TypeBadge';
import { AppBar } from './shared/AppBar';
import { Link } from 'react-router-dom';
import { colors } from './shared/colors';
import { MoveDetails } from './components/MoveDetails';
import { LazyExpansionPanel } from './shared/LazyExpansionPanel';
import { StatMeter } from './components/StatMeter';
import { totalPokemon } from '../constants';

const shouldRenderBackButton = (id: number) => id > 1;
const shouldRenderNextButton = (id: number) => id < totalPokemon;

type PokemonDetailProps = {
  state: {
    pokemonDetail: PokemonDetailState;
    title: appTitle.TitleState;
  };
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

const padding = '20px';
const maxWidth = '960px';
const oddWrapperBackgroundColor = colors.secondary;

type Mapping = { learnMethod: string; moves: PokemonMove[] };
const categorizeAndRenderMoves = (moves: PokemonMove[]) => {
  const movesByLearnMethod = moves.reduce(
    (acc, move) => {
      const key = move.version_group_details.move_learn_method.name;
      const existingMapping = acc.find(
        (mapping) => mapping.learnMethod === key
      );

      if (existingMapping) {
        existingMapping.moves.push(move);
      } else {
        acc.push({
          learnMethod: key,
          moves: [move]
        });
      }

      return acc;
    },
    [] as Mapping[]
  );

  const [isLevelUp, isNotLevelUp] = partition(
    (m: Mapping) => m.learnMethod === 'level-up',
    movesByLearnMethod
  );

  return [...isLevelUp, ...isNotLevelUp].map((mapping) => (
    <div
      style={{ marginTop: '30px', marginBottom: '10px' }}
      key={mapping.learnMethod}
    >
      <Typography
        variant="h5"
        style={{
          textTransform: 'capitalize',
          marginBottom: '10px'
        }}
      >
        {mapping.learnMethod} Moves
      </Typography>

      {mapping.moves
        .sort((a, b) =>
          a.version_group_details.level_learned_at <
          b.version_group_details.level_learned_at
            ? -1
            : 1
        )
        .map((move) => (
          <LazyExpansionPanel
            summaryText={move.move.name}
            panelDetailStyles={{ padding: 0 }}
            key={move.move.name}
          >
            <MoveDetails move={move} />
          </LazyExpansionPanel>
        ))}
    </div>
  ));
};

const renderWhenReady = (state: PokemonDetailState) => {
  const isSmBreakpoint = useMediaQuery('(max-width:600px)');

  if (!state.pokemonDetail) {
    return null;
  }

  const { details, species } = state.pokemonDetail;

  return (
    <div>
      <Grid
        container
        style={{
          backgroundColor: oddWrapperBackgroundColor,
          padding
        }}
        justify="space-between"
        alignItems="center"
      >
        {shouldRenderBackButton(details.id) && (
          <Grid item>
            <Link to={`/pokemon/${details.id - 1}`}>
              <IconButton
                aria-label="Previous"
                style={{ float: 'left', color: colors.primary }}
              >
                <BackIcon fontSize="large" />
              </IconButton>
            </Link>
          </Grid>
        )}

        <img
          src={`/pokemon-icons/${details.id}.png`}
          width="200px"
          style={{
            margin: '0 auto'
          }}
        />

        {shouldRenderNextButton(details.id) && (
          <Grid item>
            <Link to={`/pokemon/${details.id + 1}`}>
              <IconButton
                aria-label="Next"
                style={{ float: 'right', color: colors.primary }}
              >
                <ForwardIcon fontSize="large" />
              </IconButton>
            </Link>
          </Grid>
        )}
      </Grid>
      <div
        style={{
          maxWidth,
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

        <TypeBadge
          types={details.types.map((type) => type.type.name)}
          style={{
            marginRight: '10px'
          }}
        />

        <Typography variant="h6" style={{ marginTop: '15px' }}>
          {species.flavor_text}
        </Typography>
      </div>
      <div
        style={{
          padding,
          backgroundColor: oddWrapperBackgroundColor
        }}
      >
        <Grid
          container
          style={{
            maxWidth,
            margin: '0 auto',
            textAlign: isSmBreakpoint ? 'center' : 'initial'
          }}
        >
          <Grid item xs={12}>
            <Typography
              variant="h5"
              style={{
                textAlign: 'center',
                paddingTop: '10px',
                paddingBottom: '20px',
                textDecoration: 'underline'
              }}
            >
              Profile
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">
              <b>Height</b>: {details.height / 10} m
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">
              <b>Weight</b>: {details.weight / 10} kg
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" style={{ textTransform: 'capitalize' }}>
              <b>Generation</b>: {species.generation.name}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h6" style={{ textTransform: 'capitalize' }}>
              <b>Egg Groups</b>:{' '}
              {species.egg_groups.map((e) => e.name).join(', ')}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h6">
              <b>Capture Rate</b>: {species.capture_rate}%
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h6">
              <b>Base Experience</b>: {details.base_experience}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h6">
              <b>Base Happiness</b>: {species.base_happiness}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} style={{ textTransform: 'capitalize' }}>
            <Typography variant="h6">
              <b>Shape</b>: {species.shape.name}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} style={{ textTransform: 'capitalize' }}>
            <Typography variant="h6">
              <b>Color</b>: {species.color.name}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h6" style={{ textTransform: 'capitalize' }}>
              <b>Abilities</b>:{' '}
              {details.abilities
                .map((ability) => ability.ability.name)
                .join(', ')}
            </Typography>
          </Grid>
        </Grid>
      </div>

      <div style={{ padding, maxWidth, margin: '0 auto' }}>
        <Typography
          variant="h5"
          style={{
            textAlign: 'center',
            paddingTop: '10px',
            textDecoration: 'underline'
          }}
        >
          Stats
        </Typography>
        <StatMeter stats={details.stats} />
      </div>

      <div style={{ padding, maxWidth, margin: '0 auto' }}>
        <Typography
          variant="h5"
          style={{
            textAlign: 'center',
            paddingTop: '10px',
            textDecoration: 'underline'
          }}
        >
          Moves
        </Typography>
        {categorizeAndRenderMoves(details.moves)}
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

    return () => {
      actions.pokemonDetail.reset(null);
    };
  }, [match.params.id]);

  const fetching = state.pokemonDetail.fetchStatus === FetchStatuses.fetching;

  return (
    <>
      <AppBar>
        <Toolbar>
          <Link to="/" style={{ color: 'white' }}>
            <IconButton color="inherit" aria-label="Menu">
              <BackIcon />
            </IconButton>
          </Link>

          <span style={{ margin: '0 auto' }}>{state.title.title}</span>
        </Toolbar>
      </AppBar>
      <Loading show={fetching} message={state.pokemonDetail.message}>
        {renderWhenReady(state.pokemonDetail)}
      </Loading>
    </>
  );
};

const withRedux = connect(
  (state: RootState) => ({
    state: {
      pokemonDetail: state.pokemonDetail,
      title: state.title
    }
  }),
  (dispatch) => ({
    actions: {
      pokemonDetail: bindActionCreators(pokemonDetail.actions, dispatch),
      setTitle: bindActionCreators(appTitle.setTitle, dispatch)
    }
  })
);

export const PokemonDetail = withRedux(Component);
