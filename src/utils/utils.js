export const popupPicture = document.querySelector('.popup_type_picture');
const KEY_ESCAPE_VALUE = 'Escape';
const image = popupPicture.querySelector('.popup__image');
const text = popupPicture.querySelector('.popup__description');

//Наполнение контентом попапа с фотографией
export function fillPopupPicture (evt) {
  const currentImage = evt.target;
  const currentText = currentImage.alt;
  
  image.src = currentImage.src;
  image.alt = currentText;
  text.textContent = currentText;
}

//Открыть попап
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

//Функция закрытия попапа при нажатии на Esc
export function closePopupByEsc(evt) {
  if (evt.key === KEY_ESCAPE_VALUE) {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}