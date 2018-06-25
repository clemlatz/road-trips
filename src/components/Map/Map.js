import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import { Link, withRouter } from 'react-router-dom';
import slugify from 'slugify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe';

import Pin from '../Pin/Pin';
import TripLink from '../TripLink/TripLink';

import { getZoomForWidth } from '../../utils';

import './Map.scss';

const Map = ({ history, trips, selectedTrip }) => {

  let center = { lat: 63.08843, lng: -7.66545 };
  let zoomLevels = { desktop: 4, mobile: 2 };
  if (selectedTrip) {
    center = selectedTrip.mapCenter;
    zoomLevels = selectedTrip.mapZoomLevels;
  }

  
  const homeButtonClasses = ['homeButton'];

  let markers;
  if (selectedTrip) {
    markers = selectedTrip.entries.map(entry => {
      const entrySlug = slugify(entry.title, { lower: true, remove: /[:,]/ });
      return (
        <Pin key={`${entry.trip}-${entry.id}`}
          lat={entry.coords[0]} lng={entry.coords[1]}
          onClick={() => history.push(`/${selectedTrip.id}/${entry.id}-${entrySlug}`)}>
          {entry.id}
        </Pin>
      );
    });
  }
  
  else if (trips) {
    homeButtonClasses.push('hidden');
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
    <Fragment>
      <Link to="/">
        <div className={homeButtonClasses.join(' ')}>
          <FontAwesomeIcon icon={faGlobe} />
        </div>
      </Link>
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
    </Fragment>
  );
};

Map.propTypes = {
  history: PropTypes.object.isRequired,
  selectedTrip: PropTypes.object,
  trips: PropTypes.array,
};

export default withRouter(Map);
