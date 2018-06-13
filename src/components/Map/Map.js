import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import { withRouter } from 'react-router-dom';

import Pin from '../Pin/Pin';

import { getZoomForWidth } from '../../utils';

import trips from '../../trips/trips.json';

import './Map.scss';

const Map = ({ history }) => {

  // Merge entries for all trips in on array
  const entries = [].concat.apply([], trips.map(trip => {
    return trip.entries.map(entry => {
      entry.trip = trip.id;
      return entry;
    });
  }));

  const pins = entries.map(entry => {
    return (
      <Pin key={entry.id} lat={entry.coords[0]} lng={entry.coords[1]}
        onClick={() => history.push(`/${entry.trip}/${entry.id}`)}>
        {entry.id}
      </Pin>
    );
  });

  return (
    <div className="Map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBv8W4b5MznculFqFknQE79HJIDW5YXX9w' }}
        defaultZoom={getZoomForWidth()}
        defaultCenter={{ lat: 64.9313, lng: -19.0212 }}
      >
        {pins}
      </GoogleMapReact>
    </div>
  );
};

Map.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(Map);
