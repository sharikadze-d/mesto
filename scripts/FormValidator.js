class FormValidator {

  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._form.querySelector(this._config.submitButtonSelector);
  }

  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.errorClass);
    inputElement.classList.add(this._config.inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

    errorElement.textContent = '';
    errorElement.classList.remove(this._config.errorClass);
    inputElement.classList.remove(this._config.inputErrorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      })
    })
  }

  _hasInvalidInput() {
    return this._inputList.some(inputElement => {
      return (!inputElement.validity.valid);
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.classList.remove(this._config.buttonOpacity)
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.classList.add(this._config.buttonOpacity)
      this._buttonElement.disabled = false;
    }
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export {FormValidator};