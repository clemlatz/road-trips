/* global google */
/* exported initMap */

'use strict';

// MAP

class Map {

  constructor(element) {
    this.element = element;

    this.buildMap();
    this.getEntries();
  }

  /**
   * Insert Google map
   */
  buildMap() {
    this.map = new google.maps.Map(this.element, {
      center: { lat: 64.9313, lng: -19.0212 },
      zoom: 7
    });
  }

  /**
   * Fetch entries from server and create Pins
   */
  getEntries() {
    const map = this.map;
    fetch('/data/entries.json')
      .then(function(response) {
        return response.json();
      }).then(function(entries) {
        entries.forEach(function(entry) {
          new Pin(entry, map);
        });
      });
  }
}

// PIN

class Pin {

  constructor(entry, map) {
    this.entry = entry;
    this.map = map;

    this.addMarker();
  }

  /**
   * Add marker to the map
   */
  addMarker() {
    new google.maps.Marker({
      position: { lat: this.entry.coords[0], lng: this.entry.coords[1] },
      map: this.map,
      animation: google.maps.Animation.DROP,
      label: this.entry.id
    });
  }

}

/**
 * Called by Google Maps API JS when loaded
 */
function initMap() {
  const map = document.querySelector('#map');
  if (map) {
    new Map(map);
  }
}
