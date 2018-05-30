import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import getRatingColor from './getRatingColor';
import getRatingWidth from './getRatingWidth';
import './StatMeter.scss';

class StatMeter extends Component {
  constructor(props) {
    super(props);

    this.ref = createRef();
    this.state = {};
  }

  componentDidMount() {
    const { rating } = this.props;
    const { color } = getRatingColor(rating);
    const width = getRatingWidth(rating, this.ref.current);

    /* eslint-disable react/no-did-mount-set-state */
    this.setState({ color, width });
    /* eslint-enable react/no-did-mount-set-state */
  }

  render() {
    const { color, width } = this.state;

    return (
      <span className="stat-meter" ref={ this.ref }>
        <span
          className="meter-fill"
          style={ {
            backgroundColor: color,
            width: `${width}px`
          } }
        />
      </span>
    );
  }
}

StatMeter.propTypes = {
  rating: PropTypes.number
};

export default StatMeter;
