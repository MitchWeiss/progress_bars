import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import ProgressBar from './ProgressBar';

let wrapper;

describe('<App>', () => {
  beforeEach(() => {
    // Mock fetch to return empty data
    const p = Promise.resolve({json: ()=>{return {}}});
    global.fetch = jest.fn().mockImplementation(() => p)
  })

  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('shows the loading dialog', () => {
    wrapper = shallow(<App />);
    expect(wrapper.find('p').text()).toEqual("Loading...");
  });

  it("doesn't show the selector", () => {
    wrapper = shallow(<App />);
    expect(wrapper.find('select').exists()).toBe(false);
  });

  it("doesn't show any buttons", () => {
    wrapper = shallow(<App />);
    expect(wrapper.find('.btn').length).toEqual(0);
  });

  describe('after fetching data', () => {
    // Mock fetch to return test data
    beforeEach(async () => {
      const testData = { json: function() {
        return {
          buttons: [25, 52, -41, -23],
          bars: [21, 55, 69]
        }
      }}
      const p = Promise.resolve(testData)
      global.fetch = jest.fn().mockImplementation(() => p)
      wrapper = shallow(<App />);

      await p.then(); // then() chains after the .json() async call
      await wrapper.update(); // wait for re-render after adding fetched data to state
    });

    it('shows the correct number of progress bars', () => {
      expect(wrapper.find('ProgressBar').length).toEqual(3);
    }); 

    it("shows the correct number of options in the selector", () => {
      expect(wrapper.find('option').length).toEqual(3);
    });

    it("shows the correct number of buttons", () => {
      expect(wrapper.find('.btn').length).toEqual(4);
    });

    it("updates the first progress bar", () => {
      wrapper.find('.btn').first().simulate('click');
      const newVals = wrapper.find('ProgressBar').map(node => node.props().progress);
      expect(newVals).toEqual([46, 55, 69]);
    })

    it("updates the selected progress bar", () => {
      wrapper.setState({selected: 2});
      wrapper.find('.btn').first().simulate('click');
      const newVals = wrapper.find('ProgressBar').map(node => node.props().progress);
      expect(newVals).toEqual([21, 55, 94]);
    });
  });
});