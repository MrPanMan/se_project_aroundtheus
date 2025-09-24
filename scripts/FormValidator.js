export default class FormValidator {
  constructor(settings, formElement) {
    this._form = formElement;
    this._settings = settings;
  }

  _showInputError(inputEl) {
    const { inputErrorClass, errorClass } = this._settings;
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(inputErrorClass);
    if (errorMessageEl) {
      errorMessageEl.textContent = inputEl.validationMessage;
      errorMessageEl.classList.add(errorClass);
    }
  }

  _hideInputError(inputEl) {
    const { inputErrorClass, errorClass } = this._settings;
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(inputErrorClass);
    if (errorMessageEl) {
      errorMessageEl.textContent = "";
      errorMessageEl.classList.remove(errorClass);
    }
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _toggleButtonState(inputEls, submitButton) {
    const { inactiveButtonClass } = this._settings;
    const hasInvalid = Array.from(inputEls).some(
      (input) => !input.validity.valid
    );
    if (hasInvalid) {
      submitButton.classList.add(inactiveButtonClass);
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove(inactiveButtonClass);
      submitButton.disabled = false;
    }
  }

  _setEventListeners() {
    const inputEls = this._form.querySelectorAll(this._settings.inputSelector);
    const submitButton = this._form.querySelector(
      this._settings.submitButtonSelector
    );

    this._toggleButtonState(inputEls, submitButton);

    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState(inputEls, submitButton);
      });
    });

    this._toggleButtonState(inputEls, submitButton);

    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState(inputEls, submitButton);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => e.preventDefault());
    this._setEventListeners();
  }

  resetValidation() {
    const inputEls = this._form.querySelectorAll(this._settings.inputSelector);
    const submitButton = this._form.querySelector(
      this._settings.submitButtonSelector
    );
    inputEls.forEach((inputEl) => this._hideInputError(inputEl));
    this._toggleButtonState(inputEls, submitButton);
  }
}
