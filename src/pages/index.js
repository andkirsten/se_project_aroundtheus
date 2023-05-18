import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import "./index.css";
import {
  profileEditBtn,
  profileEditForm,
  addCardBtn,
  addCardForm,
  cardList,
  settings,
  profileName,
  profileTitle,
  profileNameInput,
  profileTitleInput,
  initialCards,
  cardTemplate,
} from "../components/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";

const addCardPopup = new PopupWithForm("#new-card-modal", handleAddCardSubmit);
const profilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

// const imagePopup = new PopupWithImage(this._name, this._link, "#photo__modal");

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function fillProfileForm() {
  profileNameInput.value = profileName.textContent;
  profileTitleInput.value = profileTitle.textContent;
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileTitle.textContent = profileTitleInput.value;
  profilePopup.close();
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = addCardPopup.getInputValues().title;
  const link = addCardPopup.getInputValues().imageUrl;
  renderCard({ name, link });
  addCardValidator.toggleButtonState();
  addCardPopup.close();
}

function renderCard(item) {
  const newCard = new Card(item, "#card-template", (card) => {
    console.log("card");
  });
  const card = newCard.createCard();
  cardList.prepend(card);
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

//Profile Listeners
profileEditBtn.addEventListener("click", function () {
  fillProfileForm();
  profilePopup.open();
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

//Add Card Listeners
addCardBtn.addEventListener("click", () => {
  addCardPopup.open();
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

const cardSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  cardTemplate
);

cardSection.renderItems();
