import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
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

export default withRouter(withConnect(App));
