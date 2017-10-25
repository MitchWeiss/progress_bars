import React, { Component } from 'react';
import ProgressBar from './ProgressBar';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ProgressBar progress={30} />
        <ProgressBar progress={90} />
        <ProgressBar progress={0} />
        <ProgressBar progress={100} />
        <ProgressBar progress={120} />
        <ProgressBar progress={-20} />
      </div>
    );
  }
}

export default App;
