import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._text = this._popup.querySelector('.popup__description');
  }

  //Открытие модального окна с предварительным наполнением
  open({ link, text }) {
    this._image.src = link;
    this._image.alt = text;
    this._text.textContent = text;
    super.open()
  }
}