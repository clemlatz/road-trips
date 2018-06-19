/* global module */

import 'whatwg-fetch';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Router, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { createBrowserHistory } from 'history';

import Entry from '../Entry/Entry';
import Header from '../Header/Header';
import Map from '../Map/Map';
import Photo from '../Photo/Photo';

import './App.scss';

const history = createBrowserHistory();
history.listen(function (location) {
  window.ga('set', 'page', location.pathname + location.search);
  window.ga('send', 'pageview', location.pathname + location.search);
});

class TripSelector extends React.Component {
  componentDidMount() {
    this.props.onLoad(this.props.match.params.tripId);
  }

  render() {
    return null;
  }
}

TripSelector.propTypes = {
  match: PropTypes.object.isRequired,
  onLoad: PropTypes.func.isRequired,
};

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTrip: null,
    };
  }

  onTripLoad(selectedTrip) {
    this.setState({ selectedTrip });
    return null;
  }

  render() {
    return (
      <Router history={history}>
        <Fragment>
          <Header />
          <Map selectedTrip={this.state.selectedTrip} />
          <Route path="/:tripId/"
            render={(props) => <TripSelector {...props}
              onLoad={trip => this.onTripLoad(trip)} />} />
          <Route path="/:tripId/:entryId-:entrySlug" component={Entry} />
          <Route path="/:tripId/:entryId-:entrySlug/:photoId" component={Photo} />
        </Fragment>
      </Router>
    );
  }
}

export default hot(module)(App);
