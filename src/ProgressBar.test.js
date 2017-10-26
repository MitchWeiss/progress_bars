import React from 'react';
import { shallow } from 'enzyme';
import ProgressBar from './ProgressBar';

describe('<ProgressBar>', () => {
  it('renders without crashing', () => {
    shallow(<ProgressBar />);
  });

  it('displays the correct value in the label', () => {
    const wrapper = shallow(<ProgressBar progress={10} />);
    expect(wrapper.find('.label').text()).toEqual("10%");
  });

  it("doesn't allow progress of less than 0%", () => {
    const wrapper = shallow(<ProgressBar progress={-50} />);  
    expect(wrapper.find('.label').text()).toEqual("0%");
  });


  describe('progress bar width', () => {
    it('is set to the correct percentage', () => {
      const wrapper = shallow(<ProgressBar progress={50} />);
      expect(wrapper.find('.progress').props().style.width).toEqual('50%');
    });

    it("doesn't get set higher than 100%", () => {
      const wrapper = shallow(<ProgressBar progress={120} />);
      expect(wrapper.find('.progress').props().style.width).toEqual('100%');
    });

    it("doesn't get set below 0%", () => {
      const wrapper = shallow(<ProgressBar progress={-5} />);
      expect(wrapper.find('.progress').props().style.width).toEqual('0%');
    });
  });

  describe('overflow class', () => {
    it("doesn't set the overflow class if progress is less than or equal to 100%", () => {
      const wrapper = shallow(<ProgressBar progress={100} />);
      expect(wrapper.find('.progress').props().className).toEqual('progress');
    });

    it("is set if progress is greater than 100%", () => {
      const wrapper = shallow(<ProgressBar progress={101} />);
      expect(wrapper.find('.progress').props().className).toEqual('progress overflow');
    });
  });
});