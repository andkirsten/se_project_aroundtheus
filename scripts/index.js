var initialCards = [
  {
    name: "Myeongdong",
    link: "https://unsplash.com/photos/Erld-XTqXv0",
  },
  {
    name: "Gyeongbukgong Palace",
    link: "https://unsplash.com/photos/dNtwZ-VnZ30",
  },
  {
    name: "Namsan Tower",
    link: "https://unsplash.com/photos/ku9Ftte6Ymo",
  },
  {
    name: "Dongdaemun Design Plaza",
    link: "https://unsplash.com/photos/W4qdDbv8QUM",
  },
  {
    name: "Han River",
    link: "https://unsplash.com/photos/WeWfpnynP9Y",
  },
  {
    name: "Bukhansan National Park",
    link: "https://unsplash.com/photos/ciyW1NqHLj8",
  },
  {
    name: "Busan Book Street",
    link: "https://unsplash.com/photos/olLVE0KlMyM",
  },
  {
    name: "Manjanggul Cave",
    link: "https://unsplash.com/photos/arFD2OAAdrQ",
  },
  {
    name: "Starfield Coex Mall",
    link: "https://unsplash.com/photos/jpeTs-VfP68",
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
