import React from 'react';
import PropTypes from 'prop-types';
import './Nav.scss';

const Nav = ({ children }) => (
  <nav className="nav">
    <h2 data-test="header">{ children }</h2>
  </nav>
);

Nav.propTypes = {
  children: PropTypes.string
};

export default Nav;
