const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__error_visible',
  buttonOpacity: 'button-opacity'
};

const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    'Content-Type': 'application/json',
    authorization: '7daba374-a55e-4250-81a9-4f3724b24784'
  }
}

const selectors = {
  container: '.elements',
  nameField: '.profile__name',
  jobField: '.profile__description',
  avatar: '.profile__avatar',
  popupProfile: '.popup_type_profile',
  popupCard: '.popup_type_card',
  popupPicture: '.popup_type_picture',
  cardTemplateId: '#card'
}



//Кнопки
const buttonOpenProfilePopup = document.querySelector('.profile__edit-button');
const buttonOpenCardAdditionPopup = document.querySelector('.profile__add-button');

//Формы
const formElementProfile = document.querySelector('.popup__form[name="profile-input-form"]');
const formElementCard = document.querySelector('.popup__form[name="add-card-input-form"]');

export {
  apiConfig,
  validationConfig,
  selectors,
  buttonOpenProfilePopup,
  buttonOpenCardAdditionPopup,
  formElementProfile,
  formElementCard
};