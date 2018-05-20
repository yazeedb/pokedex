import React from 'react';
import { MemoryRouter } from 'react-router';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

export const shallowWrapper = Component => props => shallow(
  <Component { ...props } />
);

export const mountWrapper = Component => props => mount(
  <Component { ...props } />
);

export const mountWithRouter = Component => props => mount(
  <MemoryRouter>
    <Component { ...props } />
  </MemoryRouter>
);
