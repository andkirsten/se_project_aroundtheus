import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ name, link }, popupSelector) {
    super({ popupSelector });
    this._name = name;
    this._link = link;
    this._modalCaption = this._popupElement.querySelector(
      ".modal__photo-caption"
    );
    this._modalImage = this._popupElement.querySelector(".modal__photo");
  }

  open() {
    this._modalCaption.textContent = this._name;
    this._modalImage.src = this._link;
    this._modalImage.alt = this._name;
    super.open();
  }

  close() {
    this._modalCaption.textContent = "";
    this._modalImage.src = "";
    this._modalImage.alt = "";
    super.close();
  }
}
