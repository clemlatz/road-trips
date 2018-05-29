import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

import { getZoomForWidth } from '../../utils';

import entries from '../../data/entries.json';

const Map = (props) => {

  const markers = entries.map(({ id, coords, title }) => {
    return <Marker key={id}
      label={id}
      position={{ lat: coords[0], lng: coords[1] }}
      title={title}
    />;
  });

  return (
    <GoogleMap
      defaultZoom={getZoomForWidth()}
      defaultCenter={{ lat: 64.9313, lng: -19.0212 }}
    >
      {markers}
    </GoogleMap>
  )
};

export default withScriptjs(withGoogleMap(Map));
