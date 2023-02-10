import {validationConfig, initialCards} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {openPopup, popupPicture, closePopupByEsc} from '../utils/utils.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import './index.css';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

const CONTAINER_SELECTOR = '.elements';
const CARD_TEMPLATE_ID = '#card';

// const buttonOpenProfilePopup = document.querySelector('.profile__edit-button');
// const buttonOpenCardAdditionPopup = document.querySelector('.profile__add-button');

// const nameField = document.querySelector('.profile__name');
// const descriptionField = document.querySelector('.profile__description');

// const popupList = Array.from(document.querySelectorAll('.popup'));

// const popupProfile = document.querySelector('.popup_type_profile');
// const popupCardAddition = document.querySelector('.popup_type_card');

// // const buttonCloseProfilePopup = popupProfile.querySelector('.popup__close-btn');
// // const buttonCloseCardAdditionPopup = popupCardAddition.querySelector('.popup__close-btn');
// // const buttonClosePicturePopup = popupPicture.querySelector('.popup__close-btn');

// const formElementProfile = popupProfile.querySelector('.popup__form');
// // const nameInput = formElementProfile.querySelector('.popup__item[name="name"]');
// const jobInput = formElementProfile.querySelector('.popup__item[name="description"]');

const formElementCard = popupCardAddition.querySelector('.popup__form');
// const linkField = formElementCard.querySelector('.popup__item[name="img-link"]');
// const placeField = formElementCard.querySelector('.popup__item[name="place"]');

const formProfileValidator = new FormValidator(validationConfig, formElementProfile);
const formCardValidator = new FormValidator(validationConfig, formElementCard);

const cardContainer = new Section( { 
  items: initialCards, 
  renderer: (item) => {
    const card = new Card(item, CARD_TEMPLATE_ID);
    cardContainer.container.prepend(card.createCard());
    }},
    CONTAINER_SELECTOR);

cardContainer.addInitialItems();
  

// //Автозаполнение input'ов значениями со станицы
// function fillPopupProfile() {
//   nameInput.value = nameField.textContent;
//   jobInput.value = descriptionField.textContent;
// }

// //Открыть попап редактирования профиля
// function openProfilePopup() {
//   fillPopupProfile();
//   openPopup(popupProfile);
// }

//Закрыть попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

// //Обработчик отправки формы редактирования профиля
// function handleProfileFormSubmit (evt) {
//     evt.preventDefault(); 
    
//     nameField.textContent = nameInput.value;
//     descriptionField.textContent = jobInput.value;

//     closePopup(popupProfile);
// }

// //Обработчик отправки формы добавления карточки
// function handleCardFormSubmit (evt) {
//   evt.preventDefault();
  
//   const cardData = {
//     link : linkField.value,
//     name : placeField.value
//   };

//   cardContainer.addItem(cardData);

//   closePopup(popupCardAddition);

//   formElementCard.reset();
//   // disableSubmitButton(formElementCard, validationConfig);
//   formCardValidator.toggleButtonState();
// }

// //Устанавливаем слушатели клика по оверлею всех попапов
// function setOverlayListeners(popupList) {
//   popupList.forEach(popup => {
//     popup.addEventListener('mousedown', (evt) => {
//       closePopupOverlayClick(evt);
//     })
//   })
// }

//Закрываем попап в случае клика по оверлею
function closePopupOverlayClick(evt) {
  if(evt.target === evt.currentTarget) {
    closePopup(evt.target.closest('.popup'));
  }
}

function enablePageValidation() {
  formProfileValidator.enableValidation();
  formCardValidator.enableValidation();
}



// fillPopupProfile();
//Если не заполнить поля ДО активации валидации, то при первом открытии
//Кнопка "Сохранить" будет неактивна, хотя оба поля валидны

// renderInitialCards(initialCards);

// buttonOpenProfilePopup.addEventListener('click', openProfilePopup);
// buttonOpenCardAdditionPopup.addEventListener('click',() => openPopup(popupCardAddition));

// setOverlayListeners(popupList);

// buttonCloseProfilePopup.addEventListener('click', () => closePopup(popupProfile));
// buttonCloseCardAdditionPopup.addEventListener('click', () => closePopup(popupCardAddition));
// buttonClosePicturePopup.addEventListener('click', () => closePopup(popupPicture));

// formElementProfile.addEventListener('submit', handleProfileFormSubmit); 
// formElementCard.addEventListener('submit', handleCardFormSubmit);
const popupProfile = new PopupWithForm('.popup_type_profile', () => {
  
});
const popupCard = new PopupWithForm('.popup_type_card', () => {

});
const popupImage = new PopupWithImage('.popup_type_picture');

popupProfile.setEventListeners();
popupCard.setEventListeners();
popupImage.setEventListeners();


enablePageValidation();
