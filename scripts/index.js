var initialCards = [
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

/* -------------------------------------------------------------------------- */
/*                                   Elements                                   */
/* -------------------------------------------------------------------------- */
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
const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector("#card-list");
/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
function closeModal() {
  profileEditModal.classList.remove("modal__opened");
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileTitle.textContent = profileTitleInput.value;
  closeModal();
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
profileEditBtn.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileTitleInput.value = profileTitle.textContent;
  profileEditModal.classList.add("modal__opened");
});

profileEditCloseBtn.addEventListener("click", () => {
  closeModal();
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach((card) => {
  const cardClone = cardTemplate.cloneNode(true);
  cardClone.querySelector("#card-image").setAttribute("src", card.link);
  cardClone.querySelector("#card-image").setAttribute("alt", card.name);
  cardClone.querySelector("#card-title").textContent = card.name;
  cardList.appendChild(cardClone);
});
