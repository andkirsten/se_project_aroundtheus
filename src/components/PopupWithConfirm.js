import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._confirmButton = this._popupElement.querySelector(
      "#delete-modal-button"
    );

    // this._cardId = cardId;
    // this._handleRemoveCard = handleRemoveCard;
  }
  open() {
    this._confirmButton.addEventListener("mousedown", () => {
      this._handleDeleteClick();
    });
    super.open();
  }

  close() {
    this._confirmButton.removeEventListener("mousedown", () => {
      this._handleDeleteClick();
    });
    super.close();
  }

  setClickAction(action) {
    this._handleDeleteClick = action;
    // this._handleRemoveCard(id);
    // this.close();
  }
}
