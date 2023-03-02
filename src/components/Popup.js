const KEY_ESCAPE_VALUE = 'Escape' 

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._buttonSubmit = this._popup.querySelector('.popup__save-btn');
    this._buttonClose = this._popup.querySelector('.popup__close-btn');
  }

  //Метод открытия модального окна
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  //Метод закрытия модального окна
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  //Обработчик закрытия модального окна клавишей "Esc"
  _handleEscClose(evt) {
    if (evt.key === KEY_ESCAPE_VALUE) {
      this.close();
    }
  }

  //Добавление слушателей событий
  setEventListeners() {
    this._buttonClose.addEventListener('click', () => { this.close(); });

    this._popup.addEventListener('mousedown', evt => {
      if(evt.target === evt.currentTarget) {
        this.close();
      }
    })
  }

  //Отображение процесса загрузки
  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonSubmit.textContent = this._buttonSubmit.dataset.buttonLoadingText;
    } else {
      this._buttonSubmit.textContent = this._buttonSubmit.dataset.buttonText;
    }
  }
}