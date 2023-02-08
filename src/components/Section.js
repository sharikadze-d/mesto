export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
    this.container = document.querySelector(this._containerSelector);
  }

  addItem(item) {
    this._renderer(item);
  }

  addInitialItems() {
    this._items.forEach(item => {
      this.addItem(item);
    })
  }
}