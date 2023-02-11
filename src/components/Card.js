export default class Card {

  constructor({name, link}, templateSelector, handleCardClick) {
    this._templateSelector = templateSelector;
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
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
    this._image.src = this._link;
    this._image.alt = this._name;
    this._text.textContent = this._name;
  }

  //Обработка нажатия кнопки "лайк"
  _handleLikeCard() {
    this._buttonLike.classList.toggle('element__like-btn_active');
  }

  //Обработка нажатия кнопки "удалить"
  _handleDeleteCard() {
    this._card.remove();
    this._card = null;
  }

  //Добавление слушателей
  _setListeners() {
    this._buttonLike.addEventListener('click', () => {this._handleLikeCard(this._buttonLike)});
    this._buttonDelete.addEventListener('click', () => {this._handleDeleteCard(this._card)});
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
    this._setData();
    this._setListeners();

    return this._card;
  }
}