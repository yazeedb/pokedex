import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.scss';

const Nav = () => (
  <nav className="nav">
    <Link to="/" data-test="all-pokemon-link">
      All Pokemon
    </Link>
  </nav>
);

export default Nav;
