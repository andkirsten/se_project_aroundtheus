import PopupWithImage from "./PopupWithImage.js";

export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._likeBtn.addEventListener("click", () => {
      this._handleLikeButton();
    });
    this._cardElement
      .querySelector(".card__remove-button")
      .addEventListener("click", () => {
        this._handleRemoveCard();
      });
    const imagePopup = new PopupWithImage(
      { name: this._name, link: this._link },
      "#photo-modal"
    );

    this._imageEl.addEventListener("click", () => {
      imagePopup.open();
    });
  }

  _handleLikeButton = () => {
    this._likeBtn.classList.toggle("card__like-button_active");
  };

  _getElement() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  createCard() {
    this._cardElement = this._getElement();
    this._imageEl = this._cardElement.querySelector(".card__img");
    this._imageEl.src = this._link;
    this._imageEl.alt = this._name;
    const cardTitle = this._cardElement.querySelector(".card__title");
    cardTitle.textContent = this._name;
    this._likeBtn = this._cardElement.querySelector(".card__like-button");
    this._setEventListeners();

    return this._cardElement;
  }

  _handleRemoveCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}
