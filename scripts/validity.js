// enabling validation by calling enableValidation()
// pass all the settings on call

const showInputError = (
  formEl,
  inputEl,
  errorMessage,
  { inputErrorClass, errorClass }
) => {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorEl.textContent = errorMessage;
  errorEl.classList.add(errorClass);
};

const hideInputError = (formEl, inputEl, { inputErrorClass, errorClass }) => {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorEl.classList.remove(errorClass);
  errorEl.textContent = "";
};

function checkInputValidity(formEl, inputEl) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }
}

const hasInvalidInput = (inputEls) => {
  return inputEls.some((inputEl) => {
    return !inputEl.validity.valid;
  });
};

const toggleButtonState = (inputEls, buttonEl, { inactiveButtonClass }) => {
  console.log(hasInvalidInput(inputEls));
  if (hasInvalidInput(inputEls)) {
    console.log(buttonEl);
    buttonEl.classList.add(inactiveButtonClass);
  } else {
    console.log("remove" + buttonEl);
    buttonEl.classList.remove(inactiveButtonClass);
  }
};

function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(options.inputSelector)];
  const { submitButtonSelector } = options;
  const buttonEl = formEl.querySelector(options.submitButtonSelector);
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", function () {
      checkInputValidity(formEl, inputEl);
      toggleButtonState(inputEls, buttonEl, config);
    });
  });
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formEl, config);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit",
  inactiveButtonClass: "modal__submit_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
