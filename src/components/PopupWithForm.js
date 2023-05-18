import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._modalForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this.inputEls = this._modalForm.querySelectorAll(".modal__input");
  }

  getInputValues() {
    const inputData = {};
    this.inputEls.forEach((input) => {
      inputData[input.name] = input.value;
    });
    return inputData;
  }

  close() {
    this._modalForm.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitBtn = this._modalForm.querySelector(".modal__submit");
    this._submitBtn.setEventListeners("click", this._handleFormSubmit);
  }
}
