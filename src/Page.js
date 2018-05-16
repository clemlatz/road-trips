import Photo from './Photo';

class Page {

  constructor(element) {
    this.element = element;
    this.id = element.querySelector('.id');
    this.title = element.querySelector('.title');
    this.date = element.querySelector('.date');
    this.content = element.querySelector('.content');
    this.close = element.querySelector('.close');
    this.photos = element.querySelector('.photos');

    this.close.addEventListener('click', () => {
      this.hide();
    });
  }

  render(id, title, date, content) {
    this.id.textContent = id;
    this.title.textContent = title;
    this.date.textContent = date;
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

export default Page;
