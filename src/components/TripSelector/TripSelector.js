import React from 'react';
import PropTypes from 'prop-types';

import ParseTrips from '../Trips/Trips';

// import trips from '../../trips/trips.yaml?stream';
const trips = ParseTrips();

class TripSelector extends React.Component {
  componentDidMount() {
    const { tripId } = this.props.match.params;
    const trip = trips.find(trip => trip.id === tripId);

    this.props.onLoad(trips, trip);
  }

  render() {
    return null;
  }
}

TripSelector.propTypes = {
  match: PropTypes.object.isRequired,
  onLoad: PropTypes.func.isRequired,
};

export default TripSelector;