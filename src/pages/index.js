import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
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
} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";

/* -------------------------------------------------------------------------- */
/*                                     API                                    */
/* -------------------------------------------------------------------------- */

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "1dfbe00d-9bab-40c1-85e5-2554e5b20b83",
    "Content-Type": "application/json",
  },
});

/* -------------------------------------------------------------------------- */
/*                                  Profile                                 */
/* -------------------------------------------------------------------------- */

const userInfo = new UserInfo(
  ".profile__name",
  ".profile__title",
  "profile__image"
);
api.getUserInfo().then((userData) => {
  userInfo.setUserInfo({ name: userData.name, title: userData.about });
});

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

function handleProfileEditSubmit(data) {
  api.editUserInfo(data);
  userInfo.setUserInfo({ name: data.name, title: data.about });
  profilePopup.close();
}

//event listeners
profileEditBtn.addEventListener("click", function () {
  fillProfileForm();
  profilePopup.open();
});

/* -------------------------------------------------------------------------- */
/*                                      Card                                  */
/* -------------------------------------------------------------------------- */
const addCardPopup = new PopupWithForm("#new-card-modal", handleAddCardSubmit);

//functions
function handleAddCardSubmit({ name, link }) {
  addCardPopup.close();
  api.addCard({ name, link }).then((res) => {
    const newCard = renderCard(res);
    cardSection.addItem(newCard);
  });
}

// function handleLikeClick(item, likes) {
//   api.addLike(item, likes);
// }

function renderCard(item) {
  const newCard = new Card(item, "#card-template", handleLikeClick);
  const cardElement = newCard.createCard();
  return cardElement;
}

function handleLikeClick() {
  console.log("like click");
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

const cardSection = new Section(renderCard, "#card-list");
api.getInitialCards().then((cards) => {
  cardSection.renderItems(cards);
});
