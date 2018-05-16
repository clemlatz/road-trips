/* global google */
/* exported initMap */

'use strict';

import 'whatwg-fetch';

import Lightbox from './Lightbox';
import Page from './Page';
import Map from './Map';

document.addEventListener('DOMContentLoaded', function () {
  const page = document.querySelector('#page');
  if (page) {
    window.page = new Page(page);
  }
  const lightbox = document.querySelector('#lightbox');
  if (lightbox) {
    window.lightbox = new Lightbox(lightbox);
  }
});

/**
 * Called by Google Maps API JS when loaded
 */
google.maps.event.addDomListener(window, 'load', function () {
  const map = document.querySelector('#map');
  if (map) {
    new Map(map);
  }
});
