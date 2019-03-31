import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../store/PokemonPreviewList/actions';
import * as types from '../store/PokemonPreviewList/types';
import * as appTitle from '../store/AppTitle';
import { RootState } from '../store/rootReducer';
import { typesToColors, colors } from './shared/colors';

type PokemonPreviewListProps = {
  state: types.PokemonListState;
  actions: {
    pokemonPreviewList: typeof actions;
    setTitle: typeof appTitle.setTitle;
  };
};

const Component: React.FunctionComponent<PokemonPreviewListProps> = ({
  state,
  actions
}) => {
  React.useEffect(() => {
    actions.pokemonPreviewList.fetchPokemonList();
    actions.setTitle('All Pokemon');
  }, []);

  console.log(actions);

  return (
    <div>
      <ul style={{ textDecoration: 'none' }}>
        {state.pokemonPreviewList.slice(0, 10).map((pokemon) => (
          <li
            key={pokemon.name}
            style={{
              borderBottom: `1px solid ${colors.previewListItemBorderColor}`,
              padding: '12px 5px'
              // justifyContent: 'space-between',
              // display: 'flex'
            }}
          >
            <img
              src={`pokemon-icons/${pokemon.id}.png`}
              style={{ marginRight: '5px' }}
            />
            <span>{pokemon.name}</span>

            {pokemon.types.map((type) => (
              <span
                key={type}
                style={{
                  color: 'white',
                  // @ts-ignore
                  backgroundColor: typesToColors[type]
                }}
              >
                {type}
              </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
    // <Link
    //   to={ `/${id}` }
    //   className={ classnames('pokemon-preview', { skeleton: fetching }) }
    //   data-test="detail-link"
    // >
    //   <div className="sprite-name-wrapper">
    //     <img
    //       src={ spriteUrl }
    //       alt={ name }
    //       data-test="sprite"
    //     />

    //     <span className="name" data-test="name">
    //       { upperFirst(name) }
    //     </span>
    //   </div>

    //   <span className="types">
    //     { types.map(type => <TypeBadge type={ type } key={ type } />) }
    //   </span>
    // </Link>
  );
};

const withRedux = connect(
  (state: RootState) => ({
    state: state.pokemonPreviewList
  }),
  (dispatch) => ({
    actions: {
      pokemonPreviewList: bindActionCreators(actions, dispatch),
      setTitle: bindActionCreators(appTitle.setTitle, dispatch)
    }
  })
);

export const PokemonPreviewList = withRedux(Component);
