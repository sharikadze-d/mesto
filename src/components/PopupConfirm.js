import Popup from "./Popup";

export default class PopupConfirm extends Popup {
  constructor(popupSelector, confirmedAction) {
    super(popupSelector);
    this._action = confirmedAction;
    this._form = this._popup.querySelector('.popup__form');
  }

  open(item) {
    this.item = item;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._action(this.item);
      this.close();
    });
  }
}