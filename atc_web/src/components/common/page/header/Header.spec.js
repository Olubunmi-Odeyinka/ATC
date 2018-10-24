import React from 'react';
import { shallow } from 'enzyme';
import {Header} from './Header';

test('Should render Header View Properly', ()=>{
  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot();
});
