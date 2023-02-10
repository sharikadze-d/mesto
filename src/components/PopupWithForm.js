import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__item'));
  }

  //Получение значений полей формы
  _getInputValues() {
    const inputValuesList = {};
    this._inputList.forEach(input => {
      inputValuesList[`${input.name}`] = input.value;
    })

    return inputValuesList;
  }

  //Добавление слушателей событий
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const data = this._getInputValues();
      this._handleFormSubmit(data);
      this.close();
     })
  }

  //Заполнение полей формы данными из передаваемого объекта
  setInputValues(data) {
    let index = 0;
    for (let key in data) {
      this._inputList[index].value = data[key];
      index++;
    }
  }

  //Закрытие модального окна со сбросом значений полей формы
  close() {
    super.close();
    this._form.reset();
  }
}