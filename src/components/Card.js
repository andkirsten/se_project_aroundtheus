export default class Card {
  constructor({
    cardData,
    cardSelector,
    userInfo,
    deletePopup,
    handleLikeClick,
    handleRemoveCard,
    imagePopup,
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
    this._imagePopup = imagePopup;
  }

  _setEventListeners() {
    this._likeBtn.addEventListener("click", () => {
      this._handleLikeClick(this.isLiked());
    });

    this._imageEl.addEventListener("click", () => {
      this._imagePopup.open();
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
      this._removeBtn.addEventListener("mousedown", () => {
        this._handleRemoveCard(this._cardId);
      });
    } else {
      this._removeBtn.classList.add("card__remove-button_disabled");
    }
  }

  isLiked() {
    return this._likes.some((like) => {
      return like._id === this._userId;
    });
  }

  updateLikes(likes) {
    this._likes = likes;
    this.renderLikes();
  }

  renderLikes() {
    const likes = this._cardElement.querySelector(".card__like-counter");
    likes.textContent = this._likes.length;
    const isLiked = this.isLiked();
    if (isLiked === true) {
      this._likeBtn.classList.add("card__like-button_active");
    } else {
      this._likeBtn.classList.remove("card__like-button_active");
    }
  }

  createCard() {
    this._cardElement = this._getElement();
    this._imageEl = this._cardElement.querySelector(".card__img");
    this._imageEl.src = this._link;
    this._imageEl.alt = this._name;
    const cardTitle = this._cardElement.querySelector(".card__title");
    cardTitle.textContent = this._name;
    this._likeBtn = this._cardElement.querySelector(".card__like-button");
    this._removeBtn = this._cardElement.querySelector(".card__remove-button");
    this._setEventListeners();
    this._checkCardOwner();
    this.renderLikes();
    return this._cardElement;
  }

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}
