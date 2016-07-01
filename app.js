/* global google */
/* exported initMap */

'use strict';

import 'whatwg-fetch';

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
      zoom: this.getZoomForWidth(),
      zoomControl: true,
      scaleControl: true,
      disableDefaultUI: true
    });

    // google.maps.event.addListener(this.map, 'click', function(event) {
    //   console.log(event.latLng.lat(), event.latLng.lng());
    // });
  }

  /**
   * Returns zoom level for window width
   */
  getZoomForWidth() {
    let width = window.innerWidth || document.documentElement.clientWidth
      || document.body.clientWidth;
    if (width < 768) {
      return 5;
    }
    return 7;
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

    this.marker.addListener('click', () => {
      window.page.render(this.entry.id, this.entry.title, this.entry.content);
      window.page.renderPhotos(this.entry.photos);
      window.page.show();
    });
  }
}

// PAGE

class Page {

  constructor(element) {
    this.element = element;
    this.id      = element.querySelector('.id');
    this.title   = element.querySelector('.title');
    this.content = element.querySelector('.content');
    this.close   = element.querySelector('.close');
    this.photos  = element.querySelector('.photos');

    this.close.addEventListener('click', () => {
      this.hide();
    });
  }

  render(id, title, content) {
    this.id.textContent = id;
    this.title.textContent = title;
    this.content.textContent = content;
  }

  renderPhotos(photos) {
    this.photos.innerHTML = '';
    photos.forEach((data) => {
      const photo = new Photo(data.id, data.caption);
      this.photos.appendChild(photo.element);
    });
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

    // When image is loaded
    image.addEventListener('load', () => {
      this.ratio = image.naturalWidth / image.naturalHeight;

      // Display lightbox when photo is clicked
      image.addEventListener('click', () => {
        window.lightbox.show(this);
      });
    });

    const text = document.createElement('p');
    text.classList.add('caption');
    text.textContent = this.caption;
    this.element.appendChild(text);

    return this.element;
  }
}

// LIGHTBOX

class Lightbox {

  constructor(element) {
    this.element = element;
    this.overlay = element.parentNode;

    this.overlay.addEventListener('click', this.hide.bind(this));

    window.addEventListener('resize', () => {
      this.resize();
    });
  }

  getDimensions() {
    const w = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0],
      windowWidth = w.innerWidth || e.clientWidth || g.clientWidth,
      windowHeight = w.innerHeight|| e.clientHeight|| g.clientHeight;

    let targetHeight = windowHeight * 0.95,
      targetWidth = targetHeight * this.imageRatio,
      targetTop = windowHeight * 0.025,
      targetLeft = windowWidth / 2 - targetWidth / 2;

    if (targetWidth > windowWidth * 0.95) {
      targetWidth = windowWidth * 0.95;
      targetHeight = targetWidth / this.imageRatio;
      targetLeft = windowWidth * 0.025;
      targetTop = windowHeight / 2 - targetHeight / 2;
    }

    return {
      top: targetTop,
      left: targetLeft,
      width: targetWidth,
      height: targetHeight
    };
  }

  resize() {
    const dimensions = this.getDimensions();

    this.element.style.width = dimensions.width + 'px';
    this.element.style.height = dimensions.height + 'px';
    this.element.style.top = dimensions.top + 'px';
    this.element.style.left = dimensions.left + 'px';
  }

  show(photo) {

    // Display image with low-res image for fast loading
    this.image = document.createElement('img');
    this.image.style.backgroundImage = `url(/data/thumbs/${photo.id}.jpg)`;
    this.element.appendChild(this.image);

    this.imageRatio = photo.ratio;
    this.overlay.style.display = 'block';
    this.resize();
    this.overlay.style.opacity = 1;

    // Load high-res image
    this.image.src = `/data/photos/${photo.id}.jpg`;
  }

  hide() {
    this.overlay.style.opacity = 0;
    this.overlay.style.display = 'none';
    this.element.innerHTML = '';
  }
}

document.addEventListener('DOMContentLoaded', function() {
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
google.maps.event.addDomListener(window, 'load', function() {
  const map = document.querySelector('#map');
  if (map) {
    new Map(map);
  }
});
