export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });
    this._cardElement
      .querySelector(".card__remove-button")
      .addEventListener("click", () => {
        this._handleRemoveCard();
      });
    this._cardElement
      .querySelector(".card__img")
      .addEventListener("click", () => {
        this.handleImageClick();
      });
  }

  _handleImageClick() {
    this._cardElement;
    this._cardElement = null;
  }

  _handleLikeButton() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleRemoveCard() {
    this._cardElement.remove();
  }

  createCard() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .querySelector(".card")
      .content.cloneNode(true);

    this._setEventListeners();
  }
}
