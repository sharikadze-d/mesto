const KEY_ESCAPE_VALUE = 'Escape' 

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  //Метод открытия модального окна
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => { this._handleEscClose(evt) });
  }

  //Метод закрытия модального окна
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  //Обработчик закрытия модального окна клавишей "Esc"
  _handleEscClose(evt) {
    if (evt.key === KEY_ESCAPE_VALUE) {
      this._popup.classList.remove('popup_opened')
    }
  }

  //Добавление слушателей событий
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