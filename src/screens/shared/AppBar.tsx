import React from 'react';
import { connect } from 'react-redux';
import { AppBar as MUIAppBar } from '@material-ui/core/';
import { TitleState } from '../../store/AppTitle';
import { RootState } from '../../store/rootReducer';
import { colors } from './colors';

type AppBarProps = {
  state: TitleState;
};

const Component: React.FunctionComponent<AppBarProps> = ({ state }) => (
  <MUIAppBar
    position="static"
    style={{
      textAlign: 'center',
      backgroundColor: colors.primary,
      padding: '20px 0'
    }}
  >
    {state.title}
  </MUIAppBar>
);

const withRedux = connect((state: RootState) => ({
  state: state.title
}));

export const AppBar = withRedux(Component);
