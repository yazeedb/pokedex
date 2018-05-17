import React from 'react';
import PropTypes from 'prop-types';
import './Nav.scss';

const Nav = ({ headerText = 'Default Title' }) => (
  <nav>
    <h1 data-test="header">{ headerText }</h1>
  </nav>
);

Nav.propTypes = {
  headerText: PropTypes.string
};

export default Nav;
