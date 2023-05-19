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
  profileNameInput,
  profileTitleInput,
  initialCards,
  profileInputData,
  cardTemplate,
  addTitleInput,
  addURLInput,
} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";

/* -------------------------------------------------------------------------- */
/*                                  Profile                                 */
/* -------------------------------------------------------------------------- */
const userInfo = new UserInfo(".profile__name", ".profile__title");

const profilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

//functions
function fillProfileForm() {
  const userData = userInfo.getUserInfo();
  profileNameInput.value = userData.name;
  profileTitleInput.value = userData.title;
}

function handleProfileEditSubmit({ name, title }) {
  userInfo.setUserInfo(
    (name = profileNameInput.value),
    (title = profileTitleInput.value)
  );
  profilePopup.close();
}

//event listeners
profileEditBtn.addEventListener("click", function () {
  fillProfileForm();
  profilePopup.open();
});

/* -------------------------------------------------------------------------- */
/*                                  Add Card                                  */
/* -------------------------------------------------------------------------- */
const addCardPopup = new PopupWithForm("#new-card-modal", handleAddCardSubmit);

//functions
function handleAddCardSubmit({ name, link }) {
  name = addTitleInput.value;
  link = addURLInput.value;
  const newCardData = { name, link };
  addCardPopup.close();
  cardSection.addItem(newCardData);
}

function renderCard(item) {
  const newCard = new Card(item, "#card-template");
  const card = newCard.createCard();
  cardList.prepend(card);
}

//event listeners
addCardBtn.addEventListener("click", () => {
  addCardValidator.toggleButtonState();
  addCardPopup.open();
});

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
  "#card-template"
);

cardSection.renderItems();
