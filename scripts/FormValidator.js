class FormValidator {
  constructor(settings, formElement) {
    this._form = formElement;
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }

  _setEventListeners() {
    const { inputSelector } = options;
    const inputEls = [this._form.querySelectorAll(options.this._inputSelector)];
    const submitButton = this._form.querySelector(
      options.this._submitButtonSelector
    );
    toggleButtonState(inputEls, submitButton, options);
    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        checkInputValidity(formEl, inputEl, options);
        toggleButtonState(inputEls, submitButton, options);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formElement, rest);
  }
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    return showINputError(formEl, inputEl, options);
  }
  hideInputError(formEl, inputEl, options);
}

function showINputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(this._errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button-save",
  inactiveButtonClass: "modal__button-save_diabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

//const editFormValidator = new FormValidator(settings, editForm);//
//editFormValidator.enableValidation();//
//const addFormValidator = new FormValidator(settings, addForm);//

export default FormValidator;
