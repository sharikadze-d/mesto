import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
  apiConfig,
  validationConfig,
  selectors,
  buttonOpenProfilePopup,
  buttonOpenCardAdditionPopup,
  formElementProfile,
  formElementCard} from '../utils/constants.js';

  const api = new Api(apiConfig);
 
  let initialCardsData;
  api.getInitialCardsData()
  .then(data => {
    //Создание экзмепляра класса Section(контейнер карточек)
const cardContainer = new Section( { 
  items: data, 
  renderer: (item) => { //Функция обработчик добавления карточки на страницу
    const card = generateCard(item);
    cardContainer.addItem(card);
    }},
    selectors.container);

//Рендер карточек "из коробки"
cardContainer.addInitialItems();
  })

  // console.log(initialCardsData)

//Генерация карточки
function generateCard(item) {
  const card = new Card(item, selectors.cardTemplateId, () => { //Функция обработчик клика по картинке
    popupImage.open(card.getCardData());
  });
  return card.createCard();
} 
//Создание экземпляра класса FormValidator для каждой формы
const formProfileValidator = new FormValidator(validationConfig, formElementProfile);
const formCardValidator = new FormValidator(validationConfig, formElementCard);

// //Создание экзмепляра класса Section(контейнер карточек)
// const cardContainer = new Section( { 
//   items: initialCardsData, 
//   renderer: (item) => { //Функция обработчик добавления карточки на страницу
//     const card = generateCard(item);
//     cardContainer.addItem(card);
//     }},
//     selectors.container);

// //Рендер карточек "из коробки"
// cardContainer.addInitialItems();

//Функция активации валидации для обеих форм на странице
function enablePageValidation() {
  formProfileValidator.enableValidation();
  formCardValidator.enableValidation();
}

//Создание экземпляра класса UserInfo(информация профиля) и загрузка данных с сервера
const userInfo = new UserInfo({
  nameSelector: selectors.nameField,
  jobSelector: selectors.jobField,
  avatarSelector: selectors.avatar});

  api.getUserData()
  .then(data => {
    userInfo.setUserInfo(data);
  })
  .catch(() => {
    console.log(new Error('Ошибка загрузки'));
  })

//Создание экзмепляров соответсвующих классов для каждого модального окна
const popupProfile = new PopupWithForm(selectors.popupProfile, (data) => {
  api.setUserData(data)
  .then((data) => {
    userInfo.setUserInfo(data); 
    popupProfile.close();
  })
  
});
const popupCard = new PopupWithForm(selectors.popupCard, (data) => {
  const card = generateCard(data);
  cardContainer.addItem(card);
  popupCard.close();
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
  formCardValidator.toggleButtonState();
  popupCard.open();
})

//Активация валидации на странице
enablePageValidation();