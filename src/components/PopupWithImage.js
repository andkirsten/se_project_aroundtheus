import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._modalCaption = this._popupElement.querySelector(
      ".modal__photo-caption"
    );
    this._modalImage = this._popupElement.querySelector(".modal__photo");
  }

  open({ name, link }) {
    this._modalCaption.textContent = name;
    this._modalImage.src = link;
    this._modalImage.alt = name;
    super.open();
  }

  close() {
    this._modalCaption.textContent = "";
    this._modalImage.src = "";
    this._modalImage.alt = "";
    super.close();
  }
}
