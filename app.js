/* global google */
/* exported initMap */

'use strict';

function initMap() {
  new google.maps.Map(document.getElementById('map'), {
    center: { lat: 64.9313, lng: -19.0212 },
    zoom: 7
  });
}
