import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

export const shallowWrapper = Component => props => shallow(<Component {...props} />);

export const mountWrapper = Component => props => mount(<Component {...props} />);
