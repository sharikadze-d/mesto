import Popup from "./Popup";

export default class PopupConfirm extends Popup {
  constructor(popupSelector, confirmedAction) {
    super(popupSelector);
    this._action = confirmedAction;
    this._form = this._popup.querySelector('.popup__form');
  }

  //Изменение родительского метода открытия попапа с передачей в него карточки для удаления
  open(item) {
    this.item = item;
    super.open();
  }

  //Изменение родительского метода установления слушателей
  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._action(this.item);
    });
  }
}