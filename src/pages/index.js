import './index.css';
import {validationConfig, initialCards, selectors} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

//Кнопки
const buttonOpenProfilePopup = document.querySelector('.profile__edit-button');
const buttonOpenCardAdditionPopup = document.querySelector('.profile__add-button');

//Формы
const formElementProfile = document.querySelector('.popup__form[name="profile-input-form"]');
const formElementCard = document.querySelector('.popup__form[name="add-card-input-form"]');

//Создание экземпляра класса FormValidator для каждой формы
const formProfileValidator = new FormValidator(validationConfig, formElementProfile);
const formCardValidator = new FormValidator(validationConfig, formElementCard);

//Создание экзмепляра класса Section(контейнер карточек)
const cardContainer = new Section( { 
  items: initialCards, 
  renderer: (item) => { //Функция обработчик добавления карточки на страницу
    const card = new Card(item, selectors.cardTemplateId, evt => { //Функция обработчик клика по картинке
      popupImage.open(evt);
    });
    cardContainer.container.prepend(card.createCard());
    }},
    selectors.container);

//Рендер карточек "из коробки"
cardContainer.addInitialItems();

//Функция активации валидации для обеих форм на странице
function enablePageValidation() {
  formProfileValidator.enableValidation();
  formCardValidator.enableValidation();
}

//Создание экземпляра класса UserInfo(информация профиля)
const userInfo = new UserInfo({
  nameSelector: selectors.nameField,
  jobSelector: selectors.jobField});

//Создание экзмепляров соответсвующих классов для каждого модального окна
const popupProfile = new PopupWithForm(selectors.popupProfile, (data) => {
  userInfo.setUserInfo(data); 
});
const popupCard = new PopupWithForm(selectors.popupCard, (data) => {
  cardContainer.addItem(data)
});
const popupImage = new PopupWithImage(selectors.popupPicture);

//Добавление слушателей на все модальные окна
popupProfile.setEventListeners();
popupCard.setEventListeners();
popupImage.setEventListeners();

//Заполнение формы редактирования при загрузке страницы, до активации валидации,
//необходимо чтобы при активации валидации она не деактивировала кнопку,
//проверив пустую форму
popupProfile.setInputValues(userInfo.getUserInfo());

//Добавление слушателей на кнопки открытия модальных окон
buttonOpenProfilePopup.addEventListener('click', () => {
  popupProfile.setInputValues(userInfo.getUserInfo());
  popupProfile.open()});

buttonOpenCardAdditionPopup.addEventListener('click', () => {
  popupCard.open();
})

//Активация валидации на странице
enablePageValidation();