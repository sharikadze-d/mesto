import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputValuesList = [];
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    const inputList = Array.from(this._popup.querySelectorAll('.popup__item'));
    inputList.forEach(input => {
      this._inputValuesList.push(input.value);
    })
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => { this._handleFormSubmit() })
  }

  close() {
    super.close();
    this._form.reset();
  }
}