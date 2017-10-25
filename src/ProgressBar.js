import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ProgressBar.css';

export default class ProgressBar extends Component {
  render() {
    const progress = this.props.progress < 0 ? 0 : this.props.progress;
    const width = progress > 100 ? "100%" : `${progress}%`;
    const progressClass = progress > 100 ? "progress overflow" : "progress";

    return (
      <div className="progress-bar">
        <div className={progressClass} style={{width}}></div>
        <span className="label">{progress}%</span>
      </div>
    )
  }
}

ProgressBar.propTypes = {
  progress: PropTypes.number
}