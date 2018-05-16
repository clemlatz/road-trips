import Pin from './Pin';

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
    this.map = new window.google.maps.Map(this.element, {
      center: { lat: 64.9313, lng: -19.0212 },
      zoom: this.getZoomForWidth(),
      zoomControl: true,
      scaleControl: true,
      disableDefaultUI: true
    });

    window.google.maps.event.addListener(this.map, 'click', function (event) {
      console.log(event.latLng.lat(), event.latLng.lng());
    });
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
    fetch('data/entries.json')
      .then(function (response) {
        return response.json();
      }).then(function (entries) {
        let delay = 0;
        entries.forEach(function (entry) {
          (function (delay) {
            window.setTimeout(() => {
              new Pin(entry, map);
            }, delay);
          })(delay);
          delay += 100;
        });
      });
  }
}

export default Map;
