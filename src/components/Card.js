import PopupWithImage from "./PopupWithImage.js";

export default class Card {
  constructor(
    cardData,
    cardSelector,
    userId,
    handleLikeClick,
    handleRemoveCard
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._id = cardData._id;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._userInfo = userInfo;
    this._handleLikeClick = handleLikeClick;
    this._handleRemoveCard = handleRemoveCard;
  }

  _setEventListeners() {
    this._likeBtn.addEventListener("click", () => {
      this._handleLikeClick;
    });
    this._cardElement
      .querySelector(".card__remove-button")
      .addEventListener("click", () => {
        this._handleRemoveCard(this._id);
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

  _checkCardOwner() {
    console.log(this._userId);
    if (this._id != this._userId) {
      const removeBtn = this._cardElement.querySelector(".card__remove-button");
      removeBtn.classList.add(".card__remove-button_disabled");
    } else {
      pass;
    }
  }

  createCard() {
    this._cardElement = this._getElement();
    this._imageEl = this._cardElement.querySelector(".card__img");
    this._imageEl.src = this._link;
    this._imageEl.alt = this._name;
    const cardTitle = this._cardElement.querySelector(".card__title");
    cardTitle.textContent = this._name;
    const likes = this._cardElement.querySelector(".card__like-counter");
    likes.textContent = this._likes.length;
    this._likeBtn = this._cardElement.querySelector(".card__like-button");
    this._setEventListeners();
    this._checkCardOwner();

    return this._cardElement;
  }

  // _handleRemove() {
  //   this._handleRemoveCard(this._id);

  // }
}
