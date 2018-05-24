import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

import { getZoomForWidth } from './../../utils';

const Map = (props) => (
  <GoogleMap
    defaultZoom={getZoomForWidth()}
    defaultCenter={{ lat: 64.9313, lng: -19.0212 }}
  >
  </GoogleMap>
);

export default withScriptjs(withGoogleMap(Map));
