import React, { Component } from 'react';
import ProgressBar from './ProgressBar';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {bars: [], buttons: [], loading: true, selected: 0};
  }
  componentDidMount() {
    fetch('http://frontend-exercise.apps.staging.digital.gov.au/bars')
    .then(res => res.json())
    .then(data => {
      this.setState({...data, loading: false});
    });
  }

  handleButtonClick(buttonVal) {
    let { bars, selected } = this.state;
    bars[selected] = Math.max(bars[selected] + buttonVal, 0)
    this.setState({bars})
  }

  buildSelect() {
    if (this.state.bars.length === 0) return;

    return (
      <select className="selector"
        onChange={(e) => this.setState({selected: parseInt(e.target.value, 10)})} 
        value={this.state.selected}>
        {this.state.bars.map((bar, i) => {
          return <option value={i} key={i}>#progress{i+1}</option>
        })}
      </select>
    );
  }

  buildButtons() {
    return this.state.buttons.map((val, i) => {
      return <button key={i} className="btn" onClick={() => {this.handleButtonClick(val)}}>{val}</button>
    });
  }

  render() {
    return (
      <div className="app">
        { this.state.loading && <p>Loading...</p> }

        { this.state.bars.map((val, i) => {
          return <ProgressBar progress={val} key={i} /> //array index only used as key as array does not reorder. Otherwise its dangerous!
        }) }

        <div className="controls">
          { this.buildSelect() }
          <div className="buttons">{ this.buildButtons() }</div>
        </div>

      </div>
    );
  }
}

export default App;
