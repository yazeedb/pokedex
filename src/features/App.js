import React from 'react';
import PropTypes from 'prop-types';
import Nav from '/components/Nav';

const App = ({ children }) => (
  <div className="app">
    <Nav headerText="ALL POKEMON" />
    { children }
  </div>
);

App.propTypes = {
  children: PropTypes.element
};

export default App;
