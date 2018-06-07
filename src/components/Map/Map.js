import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { withRouter } from 'react-router-dom';

import { getZoomForWidth } from '../../utils';

import entries from '../../data/entries.json';

const Map = (props) => {

  const markers = entries.map(({ id, coords, title }) => {
    return (
      <Marker
        key={id}
        label={id} title={title}
        position={{ lat: coords[0], lng: coords[1] }}
        onClick={() => props.history.push(`/entry/${id}`)}
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
