const editButton = document.querySelector('.profile__edit-button');
// const addButton = document.querySelector('.profile__add-button');

const nameField = document.querySelector('.profile__name');
const descriptionField = document.querySelector('.profile__description');

const popup = document.querySelector('.popup');
const formElement = popup.querySelector('.popup__container');
const nameInput = formElement.querySelector('.popup__item[name="name"]');
const jobInput = formElement.querySelector('.popup__item[name="description"]');
const closeButton = formElement.querySelector('.popup__close-btn');
// const saveButton = formElement.querySelector('.popup__save-btn');

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

popup.addEventListener('click', closePopup);
formElement.addEventListener('click', function(evt) {
  evt.stopPropagation();
})

formElement.addEventListener('submit', formSubmitHandler); 

function openPopup() {
  popup.classList.add('popup_opened');
  popupAutoFill();
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function popupAutoFill() {
  nameInput.setAttribute('value', nameField.textContent);
  jobInput.setAttribute('value', descriptionField.textContent);
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    
    nameField.textContent = nameInput.value;
    descriptionField.textContent = jobInput.value;

    closePopup();
}