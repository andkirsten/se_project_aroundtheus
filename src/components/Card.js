import PopupWithImage from "./PopupWithImage.js";

export default class Card {
  constructor({ name, link }, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this.handleCardClick = handleCardClick;
  }

  _setEventListeners() {
    this._likeBtn.addEventListener("click", () => {
      this._handleLikeButton();
    });
    this._cardElement
      .querySelector(".card__remove-button")
      .addEventListener("click", () => {
        console.log(this.handleCardClick);
        this.handleRemoveCard();
      });
    const imagePopup = new PopupWithImage(
      this._name,
      this._link,
      "#photo__modal"
    );
    this._cardElement.addEventListener("click", () => {
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
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardTitle.textContent = this._name;
    this._likeBtn = this._cardElement.querySelector(".card__like-button");
    this._setEventListeners();

    return this._cardElement;
  }

  _handleRemoveCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}
