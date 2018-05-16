

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
      animation: window.google.maps.Animation.DROP,
      label: this.entry.id,
      title: this.entry.title
    });

    this.marker.addListener('click', () => {
      window.page.render(this.entry.id, this.entry.title, this.entry.date, this.entry.content);
      window.page.renderPhotos(this.entry.photos);
      window.page.show();
    });
  }
}

export default Pin;
