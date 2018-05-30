/* global google */
/* exported initMap */

'use strict';

import 'whatwg-fetch';

import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Entry from './components/Entry/Entry';
import Header from './components/Header/Header';
import Map from './components/Map/Map';

const App = () => (
  <Router>
    <Fragment>
      <Header />
      <Map
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAJik81y-N4dkBXFH9p5sW99blqkXXwLP8"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: '100vh', position: 'fixed', top: 0, width: '100vw' }} />}
        mapElement={<div style={{ height: `100vh` }} />}
      />
      <Switch>
        <Route path="/entry/:id" component={Entry} />
      </Switch>
    </Fragment>
  </Router>
)

ReactDOM.render(<App />,
  document.getElementById('root')
);
