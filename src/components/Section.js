export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach((item) => {
      const newCard = this._renderer(item);
      this.addItem(newCard);
    });
  }
  addItem(cardEl) {
    this._container.prepend(cardEl);
  }
}
