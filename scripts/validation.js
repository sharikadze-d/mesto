//Функция включения валидации на странице
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach(formElement => {
    setEventListeners(formElement, config);
  });
}

//Функия установки слушателей на поля ввода
function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    })
  })
}

//Функия проверки валидности поля
function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

//Функция активации/деактивации кнопки "Сохранить"
function toggleButtonState(inputList, buttonElement, config) {
  console.log(hasInvalidInput(inputList));
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.classList.remove(config.buttonOpacity)
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.classList.add(config.buttonOpacity)
    buttonElement.disabled = false;
  }
}

//Функия проверки наличия невалидного поля в форме
function hasInvalidInput(inputList) {
  return inputList.some(inputElement => {
    return (!inputElement.validity.valid);
  });
}

//Функция делающая видимым текст ошибки
function showInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(config.errorClass);
  inputElement.classList.add(config.inputErrorClass);
}

//Фунция прячущая текст ошибки
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
  inputElement.classList.remove(config.inputErrorClass);
}