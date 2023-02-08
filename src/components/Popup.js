import {KEY_ESCAPE_VALUE} from '../utils/utils.js'

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => { this._handleEscClose(evt) });
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === KEY_ESCAPE_VALUE) {
      this._popup.classList.remove('popup_opened')
    }
  }

  setEventListeners() {
    const buttonClose = this._popup.querySelector('.popup__close-btn');
    buttonClose.addEventListener('click', () => { this.close(); });

    this._popup.addEventListener('mousedown', evt => {
      if(evt.target === evt.currentTarget) {
        this.close();
      }
    })
  }
}