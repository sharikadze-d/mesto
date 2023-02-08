import {fillPopupPicture, openPopup, popupPicture} from '../utils/utils.js';

export default class Card {

  constructor(data, templateSelector) {
    this._templateSelector = templateSelector;
    this._data = data;
  }
  
  //Получение шаблона карторчки и всех нужных элементов
  _getTemplate() {
    this._template = document.querySelector(this._templateSelector).content.querySelector('.element');
    this._card = this._template.cloneNode(true);
    this._image = this._card.querySelector('.element__image');
    this._text = this._card.querySelector('.element__title');
    this._buttonLike = this._card.querySelector('.element__like-btn');
    this._buttonDelete = this._card.querySelector('.element__delete-btn');
  }

  //Передача карточке изображения и заголовка
  _setData() {
    this._image.src = this._data.link;
    this._image.alt = this._data.name;
    this._text.textContent = this._data.name;
  }

  //Обработка нажатия кнопки "лайк"
  _handleLikeCard(button) {
    button.classList.toggle('element__like-btn_active');
  }

  //Обработка нажатия кнопки "удалить"
  _handleDeleteCard(card) {
    card.remove();
  }

  //Обработка нажатия на изображение
  _handleImageClick(evt) {
    fillPopupPicture(evt);
    openPopup(popupPicture);
  }

  //Добавление слушателей
  _setListeners() {
    this._buttonLike.addEventListener('click', () => {this._handleLikeCard(this._buttonLike)});
    this._buttonDelete.addEventListener('click', () => {this._handleDeleteCard(this._card)});
    this._image.addEventListener('click', this._handleImageClick)
  }

  //Создание карточки
  createCard() {
    this._getTemplate();
    this._setData();
    this._setListeners();

    return this._card;
  }
}