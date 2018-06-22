import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import { withRouter } from 'react-router-dom';
import slugify from 'slugify';

import Pin from '../Pin/Pin';
import TripLink from '../TripLink/TripLink';

import { getZoomForWidth } from '../../utils';

import trips from '../../trips/trips.json';

import './Map.scss';

const Map = ({ history, selectedTrip }) => {

  let center = { lat: 63.08843, lng: -7.66545 };
  let zoomLevels = { desktop: 4, mobile: 2 };
  if (selectedTrip) {
    center = selectedTrip.mapCenter;
    zoomLevels = selectedTrip.mapZoomLevels;
  }

  // Merge entries for all trips in one array
  const entries = [].concat.apply([], trips.map(trip => {
    return trip.entries.map(entry => {
      entry.trip = trip.id;
      return entry;
    });
  }));

  let markers;
  if (selectedTrip) {
    markers = entries.map(entry => {
      const entrySlug = slugify(entry.title, { lower: true, remove: /[:,]/ });
      return (
        <Pin key={`${entry.trip}-${entry.id}`}
          lat={entry.coords[0]} lng={entry.coords[1]}
          onClick={() => history.push(`/${entry.trip}/${entry.id}-${entrySlug}`)}>
          {entry.id}
        </Pin>
      );
    });
  } else {
    markers = trips.map(trip => {
      const { lat, lng } = trip.mapCenter;
      return (
        <TripLink key={`${trip.id}`} lat={lat} lng={lng} trip={trip} />
      );
    });
  }

  const onClick = ({ lat, lng }) => {
    const copy = document.createElement('input');
    copy.value = `[${lat}, ${lng}]`;
    document.body.appendChild(copy);
    copy.select();
    document.execCommand('copy');
    document.body.removeChild(copy);
  };

  return (
    <div className="Map">
      <GoogleMapReact onClick={onClick}
        options={() => ({ fullscreenControl: false })}
        bootstrapURLKeys={{ key: 'AIzaSyBv8W4b5MznculFqFknQE79HJIDW5YXX9w' }}
        zoom={getZoomForWidth(zoomLevels)}
        center={center}
      >
        {markers}
      </GoogleMapReact>
    </div>
  );
};

Map.propTypes = {
  history: PropTypes.object.isRequired,
  selectedTrip: PropTypes.object,
};

export default withRouter(Map);
