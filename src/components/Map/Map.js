import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { withRouter } from 'react-router-dom';

import { getZoomForWidth } from '../../utils';

import trips from '../../trips/trips.json';

const Map = (props) => {

  // Merge entries for all trips in on array
  const entries = [].concat.apply([], trips.map(trip => {
    return trip.entries.map(entry => {
      entry.trip = trip.id;
      return entry;
    });
  }));

  const markers = entries.map(({ id, coords, title, trip }) => {
    return (
      <Marker
        key={id}
        label={id} title={title}
        position={{ lat: coords[0], lng: coords[1] }}
        onClick={() => props.history.push(`/${trip}/${id}`)}
      />
    );
  });

  return (
    <GoogleMap
      defaultZoom={getZoomForWidth()}
      defaultCenter={{ lat: 64.9313, lng: -19.0212 }}
    >
      {markers}
    </GoogleMap>
  );
};

export default withRouter(withScriptjs(withGoogleMap(Map)));
