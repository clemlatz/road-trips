/* global google */
/* exported initMap */

'use strict';

import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';

import Lightbox from './Lightbox';
import Page from './Page';
import Map from './Map';

const Header = () => (
  <div id="header">
    <h1 class="title">Road Trip
      <br /> en Islande</h1>
    <p class="subtitle">Mathilde &amp; Clément
      <br /> sur les traces des macareux</p>
  </div>
)

ReactDOM.render(<Header />,
  document.getElementById('root')
);
