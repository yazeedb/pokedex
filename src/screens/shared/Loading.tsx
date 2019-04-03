import React from 'react';
import { Typography } from '@material-ui/core';
import './Loading.css';

type LoadingProps = {
  show: boolean;
  message: string;
};

export const Loading: React.FunctionComponent<LoadingProps> = ({
  show,
  children,
  message
}) =>
  show ? (
    <div
      style={{
        textAlign: 'center'
      }}
    >
      <Typography
        variant="h4"
        style={{
          margin: '50px 0'
        }}
      >
        {message}
      </Typography>
      <div className="pokeball" />
    </div>
  ) : (
    <React.Fragment>{children}</React.Fragment>
  );
