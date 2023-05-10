import { openModal } from "../utils/utils.js";

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
    this._imageEl.addEventListener("click", () => {
      this._handleImageClick();
    });
  }

  _handleImageClick() {
    const photoModal = document.querySelector("#photo-modal");
    const modalPhoto = document.querySelector(".modal__photo");
    const modalCaption = document.querySelector(".modal__photo-caption");
    modalPhoto.src = this._link;
    modalPhoto.alt = this._name;
    modalCaption.textContent = this._name;
    openModal(photoModal);
  }

  _handleLikeButton() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  createCard() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    console.log(this._cardElement);
    this._imageEl = this._cardElement.querySelector(".card__img");
    this._imageEl.src = this._link;
    this._imageEl.alt = this._name;
    this._imageEl.textContent = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }

  _handleRemoveCard() {
    this._cardElement.remove();
  }
}
