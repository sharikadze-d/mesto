import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._text = this._popup.querySelector('.popup__description');
  }

  //Наполнение модального окна с изображением
  _fillPopup(evt) {
    const currentImage = evt.target;
    const currentText = currentImage.alt;
  
    this._image.src = currentImage.src;
    this._image.alt = currentText;
    this._text.textContent = currentText;
  }

  //Открытие модального окна с предварительным наполнением
  open(evt) {
    this._fillPopup(evt);
    super.open();
  }
}