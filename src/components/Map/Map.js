import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const Map = (props) => (
  <GoogleMap
    defaultZoom={7}
    defaultCenter={{ lat: 64.9313, lng: -19.0212 }}
  >
  </GoogleMap>
);

export default withScriptjs(withGoogleMap(Map));
