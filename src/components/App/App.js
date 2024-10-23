/* global module */

import React, { Fragment } from 'react';
import { Router, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { createBrowserHistory } from 'history';

import Entry from '../Entry/Entry';
import Header from '../Header/Header';
import Map from '../Map/Map';
import Photo from '../Photo/Photo';
import TripSelector from '../TripSelector/TripSelector';

import './App.scss';

const history = createBrowserHistory();
history.listen(function (location) {
  window.ga('set', 'page', location.pathname + location.search);
  window.ga('send', 'pageview', location.pathname + location.search);
});

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      trips: null,
      selectedTrip: null,
      currentZoom: null,
    };
  }

  _onTripLoad(trips, selectedTrip) {
    this.setState({ trips, selectedTrip });
    return null;
  }

  _onMapZoomChange(zoom) {
    if (zoom <= 5 && this.state.currentZoom && zoom != this.state.currentZoom) {
      history.push('/');
    }
    this.setState({ currentZoom: 5 });
  }

  render() {

    const tripSelector = (props) => <TripSelector {...props}
      onLoad={(trips, trip) => this._onTripLoad(trips, trip)} />;

    return (
      <Router history={history}>
        <Fragment>
          <Header selectedTrip={this.state.selectedTrip} />
          <Map {...this.state}
            onZoomChange={zoom => this._onMapZoomChange(zoom)} />
          <Route exact path="/" render={tripSelector} />
          <Route path="/:tripId/" render={tripSelector} />
          <Route path="/:tripId/:entrySlugWithId" component={Entry} />
          <Route path="/:tripId/:entrySlugWithId/:photoId" component={Photo} />
        </Fragment>
      </Router>
    );
  }
}

export default hot(module)(App);
