

class Photo {

  constructor(id, caption) {
    this.id = id;
    this.caption = caption;

    this.render();
  }

  render() {
    this.element = document.createElement('div');
    this.element.classList.add('photo');

    const image = document.createElement('img');
    image.classList.add('thumbnail');
    image.src = `data/thumbs/${this.id}.jpg`;
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

export default Photo;
