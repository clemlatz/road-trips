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

    // google.maps.event.addListener(this.map, 'click', function(event) {
    //   console.log(event.latLng.lat(), event.latLng.lng());
    // });
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
    this.marker = new google.maps.Marker({
      position: { lat: this.entry.coords[0], lng: this.entry.coords[1] },
      map: this.map,
      animation: google.maps.Animation.DROP,
      label: this.entry.id,
      title: this.entry.title
    });

    this.marker.addListener('click', function() {
      window.page.setTitle(this.entry.title);
      window.page.setContent(this.entry.content);
      window.page.renderPhotos(this.entry.photos);
      window.page.show();
    }.bind(this));
  }
}

// PAGE

class Page {

  constructor(element) {
    this.element = element;
    this.title   = element.querySelector('.title');
    this.content = element.querySelector('.content');
    this.close   = element.querySelector('.close');
    this.photos  = element.querySelector('.photos');

    this.close.addEventListener('click', function() {
      this.hide();
    }.bind(this));
  }

  setTitle(title) {
    this.title.textContent = title;
  }

  setContent(content) {
    this.content.textContent = content;
  }

  renderPhotos(photos) {
    this.photos.innerHTML = '';
    photos.forEach(function(data) {
      const photo = new Photo(data.id, data.caption);
      this.photos.appendChild(photo.element);
    }.bind(this));
  }

  show() {
    this.element.style.display = 'block';
  }

  hide() {
    this.element.style.display = 'none';
  }
}

// PHOTO

class Photo {

  constructor(id, caption) {
    this.id      = id;
    this.caption = caption;

    this.render();
  }

  render() {
    this.element = document.createElement('div');
    this.element.classList.add('photo');

    const image = document.createElement('img');
    image.classList.add('thumbnail');
    image.src = `/data/thumbs/${this.id}.jpg`;
    image.alt = this.caption;
    this.element.appendChild(image);

    const text = document.createElement('p');
    text.classList.add('caption');
    text.textContent = this.caption;
    this.element.appendChild(text);

    return this.element;
  }

}

document.addEventListener('DOMContentLoaded', function() {
  const page = document.querySelector('#page');
  if (page) {
    window.page = new Page(page);
  }
});

/**
 * Called by Google Maps API JS when loaded
 */
function initMap() {
  const map = document.querySelector('#map');
  if (map) {
    new Map(map);
  }
}
