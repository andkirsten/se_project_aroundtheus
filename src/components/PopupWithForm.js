import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._modalForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this.inputEls = this._modalForm.querySelectorAll(".modal__input");
  }

  _getInputValues() {
    const inputData = {};
    this.inputEls.forEach((input) => {
      inputData[input.name] = input.value;
    });
    return inputData;
  }

  open() {
    this._modalForm.addEventListener("submit", this._handleSubmit);
    super.open();
  }

  close() {
    this._modalForm.removeEventListener("submit", this._handleSubmit);
    this._modalForm.reset();
    super.close();
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    const newData = this._getInputValues();
    this._handleFormSubmit(newData);
  };
}
