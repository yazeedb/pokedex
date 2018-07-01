import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Nav from '/components/Nav';

const App = ({ children }) => (
  <div className="app">
    <Nav />

    { children }
  </div>
);

App.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element)
};

export default withRouter(App);
