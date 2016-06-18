'use strict';

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 64.9313, lng: -19.0212 },
    zoom: 7
  });
}
