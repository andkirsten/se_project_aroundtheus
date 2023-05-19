/* -------------------------------------------------------------------------- */
/*                                   Elements                                   */
/* -------------------------------------------------------------------------- */

export const myeongdong = new URL("../images/myeongdong.jpeg", import.meta.url);
export const gyeongbukgong = new URL(
  "../images/gyeongbukgong.jpg",
  import.meta.url
);
export const namsan = new URL("../images/namsan.jpg", import.meta.url);
export const dongdaemun = new URL("../images/ddplaza.jpg", import.meta.url);
export const hanRiver = new URL("../images/han.jpg", import.meta.url);
export const bukhansan = new URL("../images/bukhansan.jpg", import.meta.url);
// card data
export const initialCards = [
  {
    name: "Myeongdong",
    link: myeongdong,
  },
  {
    name: "Gyeongbukgong Palace",
    link: gyeongbukgong,
  },
  {
    name: "Namsan Tower",
    link: namsan,
  },
  {
    name: "Dongdaemun Design Plaza",
    link: dongdaemun,
  },
  {
    name: "Han River",
    link: hanRiver,
  },
  {
    name: "Bukhansan National Park",
    link: bukhansan,
  },
];

//Profile Elements
export const profileEditBtn = document.querySelector("#profile-edit-button");
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileEditCloseBtn = document.querySelector(
  "#profile-edit-close-button"
);
export const profileName = document.querySelector("#profile-name");
export const profileTitle = document.querySelector("#profile-title");
export const profileNameInput = document.querySelector("#profile-name-input");
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileEditForm = document.querySelector("#profile-edit-form");

//Add Card Elements
export const addCardBtn = document.querySelector("#new-card-button");
export const addCardModal = document.querySelector("#new-card-modal");
export const addCardCloseBtn = document.querySelector("#new-card-close-button");
export const addCardForm = document.querySelector("#new-card-form");
export const addTitleInput = document.querySelector("#new-card-title-input");
export const addURLInput = document.querySelector("#new-card-url-input");
export const addCardSubmitBtn = document.querySelector(
  "#new-card-submit-button"
);

//Photo Modal Elements
export const photoModal = document.querySelector("#photo-modal");
export const modalCaption = document.querySelector(".modal__photo-caption");
export const modalPhoto = document.querySelector(".modal__photo");
export const photoModalCloseBtn = document.querySelector(
  "#photo-modal-close-button"
);

//General Elements
export const cardTemplate = document.querySelector("#card-template").content;
export const cardList = document.querySelector("#card-list");
export const modalEls = document.querySelectorAll(".modal");

export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit",
  inactiveButtonClass: "modal__submit_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
