import {validationConfig, initialCards} from '../utils/constants.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import './index.css';

const CARD_TEMPLATE_ID = '#card';
const KEY_ESCAPE_VALUE = 'Escape';

const buttonOpenProfilePopup = document.querySelector('.profile__edit-button');
const buttonOpenCardAdditionPopup = document.querySelector('.profile__add-button');

const nameField = document.querySelector('.profile__name');
const descriptionField = document.querySelector('.profile__description');

const popupList = Array.from(document.querySelectorAll('.popup'));
// const formList = Array.from(document.forms);

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

const cardsContainer = document.querySelector('.elements');

const formProfileValidator = new FormValidator(validationConfig, formElementProfile);
const formCardValidator = new FormValidator(validationConfig, formElementCard);


//Рендер карточек "из коробки"
function renderInitialCards (cardsDataArray) {
  cardsDataArray.forEach(element => {
    const card = new Card(element, CARD_TEMPLATE_ID);
    renderCard(card.createCard(), cardsContainer);
  });
}

//Отрисовка карточки
function renderCard(card, container) {
    container.prepend(card);
  }

//Наполнение контентом попапа с фотографией
function fillPopupPicture (evt) {
  const currentImage = evt.target;
  const currentText = currentImage.alt;
  
  image.src = currentImage.src;
  image.alt = currentText;
  text.textContent = currentText;
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
  
  const cardData = {
    link : linkField.value,
    name : placeField.value
  };

  const card = new Card(cardData, CARD_TEMPLATE_ID);
  renderCard(card.createCard(), cardsContainer);

  closePopup(popupCardAddition);

  formElementCard.reset();
  // disableSubmitButton(formElementCard, validationConfig);
  formCardValidator.toggleButtonState();
}

//Функция деактивации кнопки "Сохранить"
// function disableSubmitButton(formElement, config) {
//   const buttonElement = formElement.querySelector(config.submitButtonSelector);

//   buttonElement.classList.add(config.inactiveButtonClass);
//   buttonElement.classList.remove(config.buttonOpacity)
//   buttonElement.disabled = true;
// }

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
  if (evt.key === KEY_ESCAPE_VALUE) {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

//Функция включения валидации для всех форм страницы
// function enablePageValidation() {
//   formList.forEach(form => {
//     const formValidator = new FormValidator(validationConfig, form);
//     formValidator.enableValidation();
//   });
// }
function enablePageValidation() {
  formProfileValidator.enableValidation();
  formCardValidator.enableValidation();
}

fillPopupProfile();
//Если не заполнить поля ДО активации валидации, то при первом открытии
//Кнопка "Сохранить" будет неактивна, хотя оба поля валидны

renderInitialCards(initialCards);

buttonOpenProfilePopup.addEventListener('click', openProfilePopup);
buttonOpenCardAdditionPopup.addEventListener('click',() => openPopup(popupCardAddition));

setOverlayListeners(popupList);

buttonCloseProfilePopup.addEventListener('click', () => closePopup(popupProfile));
buttonCloseCardAdditionPopup.addEventListener('click', () => closePopup(popupCardAddition));
buttonClosePicturePopup.addEventListener('click', () => closePopup(popupPicture));

formElementProfile.addEventListener('submit', handleProfileFormSubmit); 
formElementCard.addEventListener('submit', handleCardFormSubmit);

enablePageValidation();

export {fillPopupPicture, openPopup, popupPicture};