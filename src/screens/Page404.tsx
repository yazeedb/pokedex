import React from 'react';
import { connect } from 'react-redux';
import * as appTitle from '../store/AppTitle';
import { bindActionCreators } from 'redux';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

type Page404Props = {
  actions: {
    setTitle: typeof appTitle.setTitle;
  };
};

export const Component: React.FunctionComponent<Page404Props> = ({
  actions
}) => {
  React.useEffect(() => {
    actions.setTitle('404 Page not found!');
  }, []);

  return (
    <div
      style={{
        margin: '0 auto',
        textAlign: 'center'
      }}
    >
      <Typography
        variant="h4"
        style={{
          margin: '20px 0'
        }}
      >
        We can't find that page!
      </Typography>
      <Link
        to="/"
        style={{
          marginBottom: '30px',
          display: 'inline-block'
        }}
      >
        Go back home?
      </Link>
      <img src="/pokemon-icons/54.png" alt="Psyduck" />
    </div>
  );
};

const withRedux = connect(
  null,
  (dispatch) => ({
    actions: {
      setTitle: bindActionCreators(appTitle.setTitle, dispatch)
    }
  })
);

export const Page404 = withRedux(Component);
