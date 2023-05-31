import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import "./index.css";
import {
  profileEditBtn,
  profileEditForm,
  addCardBtn,
  addCardForm,
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

const userInfo = new UserInfo(
  ".profile__name",
  ".profile__title",
  "profile__image"
);
let userId;
let cardSection;
api.getAppInfo().then(([cardData, userData]) => {
  userId = userData._id;
  userInfo.setUserInfo({ name: userData.name, title: userData.about });

  cardSection = new Section(
    {
      items: cardData,
      renderer: renderCard,
    },
    "#card-list"
  );
  cardSection.renderItems(cardData);
});

/* -------------------------------------------------------------------------- */
/*                               Card Rendering                               */
/* -------------------------------------------------------------------------- */
const addCardPopup = new PopupWithForm("#new-card-modal", handleAddCardSubmit);
const confirmDeletePopup = new PopupWithConfirm("#delete-modal");

// functions
function renderCard(item) {
  const card = new Card({
    cardData: item,
    cardSelector: "#card-template",
    userInfo: userId,
    deletePopup: confirmDeletePopup,
    handleLikeClick: (liked) => {
      console.log(liked);
      if (liked) {
        api.removeLike(item._id).then((res) => {
          card.updateLikes(res.likes);
        });
      } else {
        api.addLike(item._id).then((res) => {
          card.updateLikes(res.likes);
        });
      }
    },
    handleRemoveCard: (cardId) => {
      confirmDeletePopup.open();
      confirmDeletePopup.setClickAction(() => {
        api.removeCard(cardId);
        confirmDeletePopup.close();
        card.handleDeleteCard();
      });
    },
  });
  const cardElement = card.createCard();
  return cardElement;
}

function handleAddCardSubmit({ name, link }) {
  addCardPopup.close();
  api.addCard({ name, link }).then((res) => {
    const newCard = renderCard(res);
    cardSection.addItem(newCard);
  });
}

//event listeners
addCardBtn.addEventListener("click", () => {
  addCardValidator.toggleButtonState();
  addCardPopup.open();
});
/* -------------------------------------------------------------------------- */
/*                                  Profile                                 */
/* -------------------------------------------------------------------------- */

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
/*                               Form Validators                              */
/* -------------------------------------------------------------------------- */

const profileEditValidator = new FormValidator(settings, profileEditForm);
profileEditValidator.enableValidation();

const addCardValidator = new FormValidator(settings, addCardForm);
addCardValidator.enableValidation();
