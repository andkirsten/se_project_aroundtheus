import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import PopupWithImage from "../components/PopupWithImage.js";
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
  avatarModalInput,
  avatarOverlay,
  avatarForm,
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
  ".profile__image"
);
let userId;
let cardSection;
api
  .getAppInfo()
  .then(([cardData, userData]) => {
    userId = userData._id;
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
    });
    cardSection = new Section(
      {
        items: cardData,
        renderer: renderCard,
      },
      "#card-list"
    );
    cardSection.renderItems(cardData);
  })
  .catch((err) => {
    console.error("App Info Error:" + err);
  });

/* -------------------------------------------------------------------------- */
/*                                 validation                                 */
/* -------------------------------------------------------------------------- */
const profileEditValidator = new FormValidator(settings, profileEditForm);
profileEditValidator.enableValidation();

const addCardValidator = new FormValidator(settings, addCardForm);
addCardValidator.enableValidation();

const avatarChangeValidator = new FormValidator(settings, avatarForm);
avatarChangeValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                               Card Rendering                               */
/* -------------------------------------------------------------------------- */
const addCardPopup = new PopupWithForm("#new-card-modal", handleAddCardSubmit);
const confirmDeletePopup = new PopupWithConfirm("#delete-modal");
const imagePopup = new PopupWithImage("#photo-modal");

// functions
function renderCard(item) {
  const card = new Card({
    cardData: item,
    cardSelector: "#card-template",
    userInfo: userId,
    deletePopup: confirmDeletePopup,
    handleLikeClick: (liked) => {
      if (liked) {
        api
          .removeLike(item._id)
          .then((res) => {
            card.updateLikes(res.likes);
          })
          .catch((err) => {
            console.error("Like Remove Error:" + err);
          });
      } else {
        api
          .addLike(item._id)
          .then((res) => {
            card.updateLikes(res.likes);
          })
          .catch((err) => {
            console.error("Like Add Error:" + err);
          });
      }
    },
    handleRemoveCard: (cardId) => {
      confirmDeletePopup.setClickAction(() => {
        api
          .removeCard(cardId)
          .then(() => card.handleDeleteCard())
          .then(() => confirmDeletePopup.close())
          .catch((err) => {
            console.error("Remove Card Error:" + err);
          });
      });
      confirmDeletePopup.open();
    },
    handleCardClick: ({ name, link }) => {
      imagePopup.open({ name, link });
    },
  });
  const cardElement = card.createCard();
  return cardElement;
}

function handleAddCardSubmit({ name, link }) {
  addCardPopup.renderLoading(true);
  api
    .addCard({ name, link })
    .then((res) => {
      const newCard = renderCard(res);
      cardSection.addItem(newCard);
      addCardPopup.close();
    })
    .catch((err) => {
      console.error("Add Card Error:" + err);
    })
    .finally(() => addCardPopup.renderLoading(false, "Create"));
}

//event listeners
addCardBtn.addEventListener("click", () => {
  addCardValidator.toggleButtonState();
  addCardPopup.open();
});
/* -------------------------------------------------------------------------- */
/*                                  Popups                                    */
/* -------------------------------------------------------------------------- */

const profilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

const avatarPopup = new PopupWithForm(
  "#change-avatar-modal",
  handleAvatarFormSubmit
);
//functions

function fillProfileForm() {
  const userData = userInfo.getUserInfo();
  profileNameInput.value = userData.name;
  profileTitleInput.value = userData.about;
}

function handleProfileEditSubmit(data) {
  profilePopup.renderLoading(true);
  api
    .editUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      profilePopup.close();
    })
    .catch((err) => {
      console.error("Profile Edit Error:" + err);
    })
    .finally(() => profilePopup.renderLoading(false, "Save"));
}

function fillAvatarForm() {
  const userData = userInfo.getAvatarInfo();
  avatarModalInput.value = userData.avatar;
}

function handleAvatarFormSubmit(data) {
  avatarPopup.renderLoading(true);
  api
    .editAvatarInfo(data)
    .then((res) => {
      userInfo.setAvatarInfo(res.avatar);
      avatarPopup.close();
    })
    .catch((err) => {
      console.error("Avatar Error:" + err);
    })
    .finally(() => avatarPopup.renderLoading(false, "Save"));
}

//event listeners
profileEditBtn.addEventListener("click", function () {
  fillProfileForm();
  profilePopup.open();
});

avatarOverlay.addEventListener("click", function () {
  fillAvatarForm();
  avatarPopup.open();
});
