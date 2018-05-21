import { connect } from 'react-redux';
import Component from './component';
import { fetchPokemonDetails, selectors } from './duck';

export const mapStateToProps = selectors.getState;

const withConnect = connect(mapStateToProps, { fetchPokemonDetails });

export default withConnect(Component);
