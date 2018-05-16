

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
      windowHeight = w.innerHeight || e.clientHeight || g.clientHeight;

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
    this.image.style.backgroundImage = `url(data/thumbs/${photo.id}.jpg)`;
    this.element.appendChild(this.image);

    this.imageRatio = photo.ratio;
    this.overlay.style.display = 'block';
    this.resize();
    this.overlay.style.opacity = 1;

    // Load high-res image
    this.image.src = `data/photos/${photo.id}.jpg`;
  }

  hide() {
    this.overlay.style.opacity = 0;
    this.overlay.style.display = 'none';
    this.element.innerHTML = '';
  }
}

export default Lightbox;
