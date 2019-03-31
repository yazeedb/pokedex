import React from 'react';
import { TitleState } from '../../store/AppTitle';
import { connect } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { colors } from './colors';

type AppBarProps = {
  state: TitleState;
};

const Component: React.FunctionComponent<AppBarProps> = ({ state }) => (
  <header
    style={{
      textAlign: 'center',
      backgroundColor: colors.primary,
      color: 'white',
      padding: '20px 0',
      textTransform: 'uppercase'
    }}
  >
    {state.title}
  </header>
);

const withRedux = connect((state: RootState) => ({
  state: state.title
}));

export const AppBar = withRedux(Component);
