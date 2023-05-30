export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      const newCard = this._renderer(item);
      this._container.append(newCard);
    });
  }
  addItem(cardEl) {
    this._container.prepend(cardEl);
  }
}
