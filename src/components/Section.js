export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
    //Получение контейнера по селектору
    this._container = document.querySelector(this._containerSelector);
  }

  //Метод добавления карточки
  addItem(card) {
    this._container.prepend(card);
  }

  //Метод добавления карточек "из коробки"
  addInitialItems() {
    this._items.reverse().forEach(item => {
      this._renderer(item);
    })
  }
}