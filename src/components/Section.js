export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
    //Получение контейнера по селектору
    this.container = document.querySelector(this._containerSelector);
  }

  //Метод добавления карточки
  addItem(item) {
    this._renderer(item);
  }

  //Метод добавления карточек "из коробки"
  addInitialItems() {
    this._items.forEach(item => {
      this.addItem(item);
    })
  }
}