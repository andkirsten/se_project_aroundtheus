import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { openModal, closeModal } from "../utils/utils.js";

/* -------------------------------------------------------------------------- */
/*                                   Elements                                   */
/* -------------------------------------------------------------------------- */

// card data
const initialCards = [
  {
    name: "Myeongdong",
    link: "./images/myeongdong.jpeg",
  },
  {
    name: "Gyeongbukgong Palace",
    link: "./images/gyeongbukgong.jpg",
  },
  {
    name: "Namsan Tower",
    link: "./images/namsan.jpg",
  },
  {
    name: "Dongdaemun Design Plaza",
    link: "./images/ddplaza.jpg",
  },
  {
    name: "Han River",
    link: "./images/han.jpg",
  },
  {
    name: "Bukhansan National Park",
    link: "./images/bukhansan.jpg",
  },
];

//Profile Elements
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseBtn = document.querySelector(
  "#profile-edit-close-button"
);
const profileName = document.querySelector("#profile-name");
const profileTitle = document.querySelector("#profile-title");
const profileNameInput = document.querySelector("#profile-name-input");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileEditForm = document.querySelector("#profile-edit-form");

//Add Card Elements
const addCardBtn = document.querySelector("#new-card-button");
const addCardModal = document.querySelector("#new-card-modal");
const addCardCloseBtn = document.querySelector("#new-card-close-button");
const addCardForm = document.querySelector("#new-card-form");
const addTitleInput = document.querySelector("#new-card-title-input");
const addURLInput = document.querySelector("#new-card-url-input");
const addCardSubmitBtn = document.querySelector("#new-card-submit-button");

//Photo Modal Elements
const photoModal = document.querySelector("#photo-modal");
const modalCaption = document.querySelector(".modal__photo-caption");
const modalPhoto = document.querySelector(".modal__photo");
const photoModalCloseBtn = document.querySelector("#photo-modal-close-button");

//General Elements
const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector("#card-list");
const modalEls = document.querySelectorAll(".modal");

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit",
  inactiveButtonClass: "modal__submit_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function fillProfileForm() {
  profileNameInput.value = profileName.textContent;
  profileTitleInput.value = profileTitle.textContent;
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileTitle.textContent = profileTitleInput.value;
  closeModal(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = addTitleInput.value;
  const link = addURLInput.value;
  renderCard({ name, link });
  e.target.reset();
  addCardSubmitBtn.classList.add("modal__submit_disabled");
  closeModal(addCardModal);
}

function renderCard(data) {
  const newCard = new Card(data, "#card-template");
  const card = newCard.createCard();
  cardList.prepend(card);
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

//Profile Listeners
profileEditBtn.addEventListener("click", function () {
  fillProfileForm();
  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

//Add Card Listeners
addCardBtn.addEventListener("click", () => {
  openModal(addCardModal);
});

addCardForm.addEventListener("submit", handleAddCardSubmit);

/* -------------------------------------------------------------------------- */
/*                               Form Validators                              */
/* -------------------------------------------------------------------------- */

const profileEditValidator = new FormValidator(settings, profileEditForm);
profileEditValidator.enableValidation();

const addCardValidator = new FormValidator(settings, addCardForm);
addCardValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                               Card Rendering                               */
/* -------------------------------------------------------------------------- */

initialCards.forEach(renderCard);
