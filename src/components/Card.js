import PopupWithImage from "./PopupWithImage.js";

export default class Card {
  constructor({
    cardData,
    cardSelector,
    userInfo,
    deletePopup,
    handleLikeClick,
    handleRemoveCard,
  }) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._ownerId = cardData.owner._id;
    this._userId = userInfo;
    this._deletePopup = deletePopup;
    this._cardId = cardData._id;
    this._cardSelector = cardSelector;
    this._handleLikeClick = handleLikeClick;
    this._handleRemoveCard = handleRemoveCard;
  }

  _setEventListeners() {
    const imagePopup = new PopupWithImage(
      { name: this._name, link: this._link },
      "#photo-modal"
    );

    this._likeBtn.addEventListener("click", () => {
      this._handleLikeClick;
    });

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
    if (this._ownerId === this._userId) {
      const trashBtn = this._cardElement.querySelector(".card__remove-button");
      trashBtn.addEventListener("mousedown", () => {
        this._handleRemoveCard(this._cardId);
      });
    } else {
      const trashBtn = this._cardElement.querySelector(".card__remove-button");
      trashBtn.classList.add("card__remove-button_disabled");
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

  // _handleRemoveClick() {
  //   this._deletePopup.open();
  // }

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}
