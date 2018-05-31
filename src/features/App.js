import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Nav from '/components/Nav';
import { selectors } from '/ducks/title';

const App = ({ children, title }) => (
  <div className="app">
    <Nav>{ title }</Nav>

    { children }
  </div>
);

App.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  title: PropTypes.string
};

const withConnect = connect(selectors.getTitle);

export default withConnect(App);
