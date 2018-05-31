import { connect } from 'react-redux';
import { actions } from '/ducks/title';
import Component from './component';
import { fetchPokemon, selectors } from './duck';

export const mapStateToProps = selectors.getState;

const withConnect = connect(mapStateToProps, {
  fetchPokemon,
  setTitle: actions.setTitle
});

export default withConnect(Component);
