import React from 'react';
import { AppBar as MUIAppBar } from '@material-ui/core/';
import { colors } from './colors';

type AppBarProps = {
  style?: React.CSSProperties;
};

export const AppBar: React.FunctionComponent<AppBarProps> = ({
  children,
  style = {}
}) => (
  <MUIAppBar
    position="static"
    style={{
      backgroundColor: colors.primary,
      ...style
    }}
  >
    {children}
  </MUIAppBar>
);
