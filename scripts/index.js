const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const nameField = document.querySelector('.profile__name');
const descriptionField = document.querySelector('.profile__description');

const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const popupCardAddition = document.querySelector('.popup_type_card');
const popupPicture = document.querySelector('.popup_type_picture');

const formElementProfile = popupProfile.querySelector('.popup__form');
const formElementCard = popupCardAddition.querySelector('.popup__form');
const nameInput = formElementProfile.querySelector('.popup__item[name="name"]');
const jobInput = formElementProfile.querySelector('.popup__item[name="description"]');
const closeButtons = document.querySelectorAll('.popup__close-btn');
const cardTemplate = document.querySelector('#card');
const cardsContainer = document.querySelector('.elements');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Создание карточки по шаблону template с заданными значениями и слушателями событий
function createCard (link, name) {
  const card = cardTemplate.content.querySelector('.element').cloneNode(true);
  card.querySelector('.element__image').src = link;
  card.querySelector('.element__title').textContent = name;

  const likeButton = card.querySelector('.element__like-btn');
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('element__like-btn_active');
  })

  const deleteButton = card.querySelector('.element__delete-btn');
  deleteButton.addEventListener('click', deleteCard);

  const image = card.querySelector('.element__image');
  image.addEventListener('click', evt => {
    fillPopupPicture(evt);
    openPopup(popupPicture);
  });

  return card;
}

//Наполнение контентом попапа с фотографией
function fillPopupPicture (evt) {
  const image = popupPicture.querySelector('.popup__image');
  const text = popupPicture.querySelector('.popup__description');

  const currentImage = evt.target;
  const currentText = evt.target.nextElementSibling.querySelector('.element__title');

  image.src = currentImage.src;
  image.alt = currentText.textContent;
  text.textContent = currentText.textContent;
}

//Удаление карточки
function deleteCard(evt) {
  evt.target.closest('.element').remove();
}

//Рендер карточки на страницу
function renderCard (card) {
  cardsContainer.prepend(card)
}

//Рендер карточек "из коробки"
function renderInitialCards (cardsDataArray) {
  cardsDataArray.forEach(element => {
    renderCard(createCard(element.link, element.name));
  });
}

//Автозаполнение input'ов значениями со станицы
function popupAutoFill() {
  nameInput.value = nameField.textContent;
  jobInput.value = descriptionField.textContent;
}

//Открыть попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popupAutoFill();
}

//Закрыть попап
function closePopup(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
}

//Обработчик отправки формы редактирования профиля
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    
    nameField.textContent = nameInput.value;
    descriptionField.textContent = jobInput.value;

    closePopup(evt);
}

//Обработчик отправки формы добавления карточки
function cardFormSubmitHandler (evt) {
  evt.preventDefault();
  const linkField = document.querySelector('.popup__item[name="img-link"]');
  const placeField = document.querySelector('.popup__item[name="place"]');
  
  const cardData = {};
  cardData.link = linkField.value;
  cardData.name = placeField.value;

  const card = createCard(cardData.link, cardData.name);
  renderCard(card);
  closePopup(evt);

  linkField.value = '';
  placeField.value = '';
}

//Добавление слушателя событий на все кнопки закрытия
function addCloseButtonsListener (buttonsCollection) {
  buttonsCollection.forEach(button => {
    button.addEventListener('click', closePopup);
  });
}

renderInitialCards(initialCards);

editButton.addEventListener('click',() => openPopup(popupProfile));
addButton.addEventListener('click',() => openPopup(popupCardAddition));
addCloseButtonsListener(closeButtons);

formElementProfile.addEventListener('submit', formSubmitHandler); 
formElementCard.addEventListener('submit', cardFormSubmitHandler);