import PopupWithImage from "./PopupWithImage.js";

export default class Card {
  constructor(cardData, cardSelector, handleLikeClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._cardSelector = cardSelector;
    this._handleLikeClick = handleLikeClick;
  }

  _setEventListeners() {
    this._likeBtn.addEventListener("click", () => {
      this._handleLikeClick;
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
    const likes = this._cardElement.querySelector(".card__like-counter");
    // console.log(this._likes.length);
    // likes.textContent = this._likes.length;
    this._likeBtn = this._cardElement.querySelector(".card__like-button");
    this._setEventListeners();

    return this._cardElement;
  }

  _handleRemoveCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}
