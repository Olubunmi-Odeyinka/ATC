import React from 'react';
import { shallow } from 'enzyme';
import Footer  from './Footer';

test('Should render Footer View Properly', ()=>{
  const wrapper = shallow(<Footer />);
  expect(wrapper).toMatchSnapshot();
});
