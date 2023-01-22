import {fillPopupPicture, openPopup, popupPicture} from './index.js';

class Card {
  constructor(data, template) {
    this._template = document
    .querySelector(template)
    .content
    .querySelector('.element');
    this._card = this._template.cloneNode(true);
    this._data = data;
    this._image = this._card.querySelector('.element__image');
    this._text = this._card.querySelector('.element__title');
    this._buttonLike = this._card.querySelector('.element__like-btn');
    this._buttonDelete = this._card.querySelector('.element__delete-btn');
  }

  _setData() {
    this._image.src = this._data.link;
    this._image.alt = this._data.name;
    this._text.textContent = this._data.name;
  }

  _likeCard(evt) {
    evt.target.classList.toggle('element__like-btn_active');
  }

  _deleteCard(evt) {
    evt.target.closest('.element').remove();
  }

  _openPopupPicture(evt) {
    fillPopupPicture(evt);
    openPopup(popupPicture);
  }

  _setListeners() {
    this._buttonLike.addEventListener('click', this._likeCard);
    this._buttonDelete.addEventListener('click', this._deleteCard);
    this._image.addEventListener('click', this._openPopupPicture)
  }

  _createCard() {
    this._setData();
    this._setListeners();
  }

  renderCard(container) {
    this._createCard();
    container.prepend(this._card);
  }
}

export {Card}