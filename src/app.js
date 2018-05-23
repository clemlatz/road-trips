/* global google */
/* exported initMap */

'use strict';

import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header/Header';
import Lightbox from './Lightbox';
import Page from './Page';
import Map from './Map';

const App = () => (
  <Header />
)

ReactDOM.render(<App />,
  document.getElementById('root')
);
