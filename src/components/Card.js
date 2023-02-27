export default class Card {

  constructor({name, link, likes, owner, _id}, templateSelector, handleCardClick, handleDeleteClick) {
    this._templateSelector = templateSelector;
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
    this._likes = likes;
    this._likeCount = likes.length;
    this._handleDeleteClick = handleDeleteClick;
    this._owner = owner._id;
    this._id = _id;
  }
  
  //Получение шаблона карторчки и всех нужных элементов
  _getTemplate() {
    this._template = document.querySelector(this._templateSelector).content.querySelector('.element');
    this._card = this._template.cloneNode(true);
    this._image = this._card.querySelector('.element__image');
    this._text = this._card.querySelector('.element__title');
    this._buttonLike = this._card.querySelector('.element__like-btn');
    this._buttonDelete = this._card.querySelector('.element__delete-btn');
    this._likeCounter = this._card.querySelector('.element__like-counter');
  }

  _checkOwner() {
    if (this._owner != '2d53711114e6a31d868fcd5b') {
      this._buttonDelete.remove();
    }
  }

  //Передача карточке изображения и заголовка
  _setData() {
    this._image.src = this._link;
    this._image.alt = this._name;
    this._text.textContent = this._name;
    this._likeCounter.textContent = this._likeCount;
  }

  //Обработка нажатия кнопки "лайк"
  _handleLikeCard() {
    this._buttonLike.classList.toggle('element__like-btn_active');
  }

  //Удаление карточки
  delete() {
    this._card.remove();
    this._card = null;
  }

  //Добавление слушателей
  _setListeners() {
    this._buttonLike.addEventListener('click', () => {this._handleLikeCard()});
    this._buttonDelete.addEventListener('click', this._handleDeleteClick);
    this._image.addEventListener('click', evt => {
      this._handleCardClick(evt);
    })
  }

  getCardData() {
    const data = {};
    data.link = this._link;
    data.text = this._text.textContent;

    return data;
  }

  //Создание карточки
  createCard() {
    this._getTemplate();
    this._checkOwner();
    this._setData();
    this._setListeners();

    return this._card;
  }
}