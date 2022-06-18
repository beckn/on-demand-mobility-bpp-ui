import React from 'react';
import { shallow, render, mount } from 'enzyme';
import Landing from './Landing';

describe('Landing', () => {
  let props;
  let shallowLanding;
  let renderedLanding;
  let mountedLanding;

  const shallowTestComponent = () => {
    if (!shallowLanding) {
      shallowLanding = shallow(<Landing {...props} />);
    }
    return shallowLanding;
  };

  const renderTestComponent = () => {
    if (!renderedLanding) {
      renderedLanding = render(<Landing {...props} />);
    }
    return renderedLanding;
  };

  const mountTestComponent = () => {
    if (!mountedLanding) {
      mountedLanding = mount(<Landing {...props} />);
    }
    return mountedLanding;
  };  

  beforeEach(() => {
    props = {};
    shallowLanding = undefined;
    renderedLanding = undefined;
    mountedLanding = undefined;
  });

  // Shallow / unit tests begin here
 
  // Render / mount / integration tests begin here
  
});
