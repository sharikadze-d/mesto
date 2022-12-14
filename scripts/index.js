const buttonOpenProfilePopup = document.querySelector('.profile__edit-button');
const buttonOpenCardAdditionPopup = document.querySelector('.profile__add-button');

const nameField = document.querySelector('.profile__name');
const descriptionField = document.querySelector('.profile__description');

const popupList = Array.from(document.querySelectorAll('.popup'));

const popupProfile = document.querySelector('.popup_type_profile');
const popupCardAddition = document.querySelector('.popup_type_card');
const popupPicture = document.querySelector('.popup_type_picture');

const buttonCloseProfilePopup = popupProfile.querySelector('.popup__close-btn');
const buttonCloseCardAdditionPopup = popupCardAddition.querySelector('.popup__close-btn');
const buttonClosePicturePopup = popupPicture.querySelector('.popup__close-btn');

const formElementProfile = popupProfile.querySelector('.popup__form');
const nameInput = formElementProfile.querySelector('.popup__item[name="name"]');
const jobInput = formElementProfile.querySelector('.popup__item[name="description"]');

const formElementCard = popupCardAddition.querySelector('.popup__form');
const linkField = formElementCard.querySelector('.popup__item[name="img-link"]');
const placeField = formElementCard.querySelector('.popup__item[name="place"]');

const image = popupPicture.querySelector('.popup__image');
const text = popupPicture.querySelector('.popup__description');

const cardTemplate = document.querySelector('#card').content.querySelector('.element');
const cardsContainer = document.querySelector('.elements');

const keyEscapeValue = 'Escape';

//Создание карточки по шаблону template с заданными значениями и слушателями событий
function createCard (cardData) {
  const card = cardTemplate.cloneNode(true);
  const image = card.querySelector('.element__image');
  const text = card.querySelector('.element__title');

  image.src = cardData.link;
  image.alt = cardData.name;
  text.textContent = cardData.name;

  const buttonLike = card.querySelector('.element__like-btn');
  buttonLike.addEventListener('click', () => {
    buttonLike.classList.toggle('element__like-btn_active');
  })

  const buttonDelete = card.querySelector('.element__delete-btn');
  buttonDelete.addEventListener('click', deleteCard);

  
  image.addEventListener('click', evt => {
    fillPopupPicture(evt);
    openPopup(popupPicture);
  });

  return card;
}

//Наполнение контентом попапа с фотографией
function fillPopupPicture (evt) {
  const currentImage = evt.target;
  const currentText = currentImage.alt;
  
  image.src = currentImage.src;
  image.alt = currentText;
  text.textContent = currentText;
}

//Удаление карточки
function deleteCard(evt) {
  evt.target.closest('.element').remove();
}

//Рендер карточки на страницу
function renderCard (card, container) {
  container.prepend(card)
}

//Рендер карточек "из коробки"
function renderInitialCards (cardsDataArray) {
  cardsDataArray.forEach(element => {
    renderCard(createCard(element), cardsContainer);
  });
}

//Автозаполнение input'ов значениями со станицы
function fillPopupProfile() {
  nameInput.value = nameField.textContent;
  jobInput.value = descriptionField.textContent;
}

//Открыть попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

//Открыть попап редактирования профиля
function openProfilePopup() {
  fillPopupProfile();
  openPopup(popupProfile);
}

//Закрыть попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

//Обработчик отправки формы редактирования профиля
function handleProfileFormSubmit (evt) {
    evt.preventDefault(); 
    
    nameField.textContent = nameInput.value;
    descriptionField.textContent = jobInput.value;

    closePopup(popupProfile);
}

//Обработчик отправки формы добавления карточки
function handleCardFormSubmit (evt) {
  evt.preventDefault();
  
  const cardData = {};
  cardData.link = linkField.value;
  cardData.name = placeField.value;

  const card = createCard(cardData);
  renderCard(card, cardsContainer);
  closePopup(popupCardAddition);

  formElementCard.reset();
  disableSubmitButton(formElementCard, validationConfig);
}

//Функция деактивации кнопки "Сохранить"
function disableSubmitButton(formElement, config) {
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.classList.remove(config.buttonOpacity)
  buttonElement.disabled = true;
}

//Устанавливаем слушатели клика по оверлею всех попапов
function setOverlayListeners(popupList) {
  popupList.forEach(popup => {
    popup.addEventListener('mousedown', (evt) => {
      closePopupOverlayClick(evt);
    })
  })
}

//Закрываем попап в случае клика по оверлею
function closePopupOverlayClick(evt) {
  if(evt.target === evt.currentTarget) {
    closePopup(evt.target.closest('.popup'));
  }
}

//Функция закрытия попапа при нажатии на Esc
function closePopupByEsc(evt) {
  const popup = document.querySelector('.popup_opened');

  if (evt.key === keyEscapeValue) {
    closePopup(popup);
  }
}

fillPopupProfile();
renderInitialCards(initialCards);

buttonOpenProfilePopup.addEventListener('click', openProfilePopup);
buttonOpenCardAdditionPopup.addEventListener('click',() => openPopup(popupCardAddition));

setOverlayListeners(popupList);

buttonCloseProfilePopup.addEventListener('click', () => closePopup(popupProfile));
buttonCloseCardAdditionPopup.addEventListener('click', () => closePopup(popupCardAddition));
buttonClosePicturePopup.addEventListener('click', () => closePopup(popupPicture));

formElementProfile.addEventListener('submit', handleProfileFormSubmit); 
formElementCard.addEventListener('submit', handleCardFormSubmit);

enableValidation(validationConfig);