import React from 'react';
import { withRouter } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';

import { getZoomForWidth } from '../../utils';

import trips from '../../trips/trips.json';

import './Map.scss';

const Marker = ({ children }) => {
  return <div className="Pin">{children}</div>;
};

const Map = (props) => {

  // Merge entries for all trips in on array
  const entries = [].concat.apply([], trips.map(trip => {
    return trip.entries.map(entry => {
      entry.trip = trip.id;
      return entry;
    });
  }));

  const pins = entries.map(entry => {
    return (
      <Marker key={entry.id} lat={entry.coords[0]} lng={entry.coords[1]}>
        {entry.id}
      </Marker>
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

export default Map;
