export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickClose = this._handleClickClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    this._popupElement.addEventListener("keydown", this._handleEscClose);
    this._popupElement.addEventListener("mousedown", this._handleClickClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    this._popupElement.removeEventListener("keydown", this._handleEscClose);
    this._popupElement.removeEventListener("mousedown", this._handleClickClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleClickClose(evt) {
    if (
      evt.target.classList.contains("modal") ||
      evt.target.classList.contains("modal__close")
    ) {
      this.close();
    }
  }
}
