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
  formElementCard,
  formElementAvatar,
  buttonAvatar,} from '../utils/constants.js';
import PopupConfirm from '../components/PopupConfirm';

//Генерация карточки
function generateCard(item) {
  const card = new Card(item, selectors.cardTemplateId, userInfo.id, {
    handleCardClick: () => { //Функция обработчик клика по картинке
            popupImage.open(card.getCardData());
    },
    handleDeleteClick: () => { //Функция обработчик клика по иконке "удалить"
      popupDeleteConfirm.open(card); //Открытие попапа подтверждения удаления
    },
    handleLikeClick: () => { //Функция обработчик клика на "лайк"
      if (!card.isLiked) {
        api.addLike(card)
        .then(res => {
          card.toggleLike(res.likes.length);});
      } else {
        api.removeLike(card)
        .then(res => {
          card.toggleLike(res.likes.length);});
      }
    }});
  return card.createCard();
} 

//Функция активации валидации для обеих форм на странице
function enablePageValidation() {
  formProfileValidator.enableValidation();
  formCardValidator.enableValidation();
  formAvatarValidator.enableValidation();
}

//Создание экземпляра класса Api
const api = new Api(apiConfig);
let cardContainer; //Объявление, чтобы контейнер остался в глобальной области видимости

Promise.all([
  api.getUserData() //Получение данных профиля с сервера
  .then(data => {
    userInfo.setUserInfo(data);
  })
  .catch(() => {
    console.log(new Error('Ошибка загрузки'));
  }),
    
  api.getInitialCardsData()
  .then(data => {
    //Создание экзмепляра класса Section(контейнер карточек)
    cardContainer = new Section( { 
      items: data, //Массив с данными карточек с сервера
      renderer: (item) => { //Функция обработчик добавления карточки на страницу
        const card = generateCard(item);
        cardContainer.addItem(card);
      }},
      selectors.container);

  //Рендер карточек "из коробки"
  cardContainer.addInitialItems();
  })
]);

//Создание экземпляра класса FormValidator для каждой формы
const formProfileValidator = new FormValidator(validationConfig, formElementProfile);
const formCardValidator = new FormValidator(validationConfig, formElementCard);
const formAvatarValidator = new FormValidator(validationConfig, formElementAvatar);

//Создание экземпляра класса UserInfo(информация профиля) и загрузка данных с сервера
const userInfo = new UserInfo({
  nameSelector: selectors.nameField,
  jobSelector: selectors.jobField,
  avatarSelector: selectors.avatar});
  
//Создание экзмепляров соответсвующих классов для каждого модального окна
/*------------------------------------------------------------------------*/
const popupProfile = new PopupWithForm(selectors.popupProfile, (data) => {
  popupProfile.renderLoading(true);
  api.setUserData(data)
  .then((data) => {
    userInfo.setUserInfo(data); 
    popupProfile.close();
  })
  .finally(() => { popupProfile.renderLoading(false); })
});

const popupCard = new PopupWithForm(selectors.popupCard, (data) => {
  popupCard.renderLoading(true);
  api.setCardData(data)
  .then((data) => {
    const card = generateCard(data);
    cardContainer.addItem(card);
    popupCard.close();})
  .finally(() => { popupCard.renderLoading(false); })
  });
  
const popupAvatar = new PopupWithForm(selectors.popupAvatar, (data) => {
  popupAvatar.renderLoading(true);
  api.setAvatar(data)
  .then(res => { userInfo.setAvatar(res); })
  .then(() => { popupAvatar.close(); })
  .finally(() => { popupAvatar.renderLoading(false); })
  });

const popupDeleteConfirm = new PopupConfirm(selectors.popupConfirm,  (item) => {
  popupDeleteConfirm.renderLoading(true);
  api.deleteCard(item)
  .then(card => { card.delete() })
  .then(() => { popupDeleteConfirm.close(); })
  .finally(() => { popupDeleteConfirm.renderLoading(false); })
  });
  
const popupImage = new PopupWithImage(selectors.popupPicture);
/*------------------------------------------------------------------------*/
  
  //Добавление слушателей на все модальные окна
  popupProfile.setEventListeners();
  popupCard.setEventListeners();
  popupImage.setEventListeners();
  popupDeleteConfirm.setEventListeners();
  popupAvatar.setEventListeners();

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
});

buttonAvatar.addEventListener('click', () => {
  popupAvatar.open();
});

//Активация валидации на странице
enablePageValidation();