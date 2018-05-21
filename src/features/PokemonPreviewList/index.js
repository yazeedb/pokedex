import { connect } from 'react-redux';
import Component from './component';
import { fetchPokemon, selectors } from './duck';

export const mapStateToProps = selectors.getState;

const withConnect = connect(mapStateToProps, { fetchPokemon });

export default withConnect(Component);
