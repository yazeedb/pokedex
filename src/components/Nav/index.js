import React from 'react';
import PropTypes from 'prop-types';
import './Nav.scss';

const Nav = ({ headerText = 'Default Title' }) => (
  <nav className="nav">
    <h2 data-test="header">{ headerText }</h2>
  </nav>
);

Nav.propTypes = {
  headerText: PropTypes.string
};

export default Nav;
