import React from 'react';
import PropTypes from 'prop-types';

class TripSelector extends React.Component {
  componentDidMount() {
    this.props.onLoad(this.props.match.params.tripId);
  }

  render() {
    return null;
  }
}

TripSelector.propTypes = {
  match: PropTypes.object.isRequired,
  onLoad: PropTypes.func.isRequired,
};