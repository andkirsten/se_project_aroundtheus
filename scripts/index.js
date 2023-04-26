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
const addCardBtn = document.querySelector("#new-card-button");
const addCardModal = document.querySelector("#new-card-modal");
const addCardCloseBtn = document.querySelector("#new-card-close-button");
const addCardForm = document.querySelector("#new-card-form");
const addCardTitle = document.querySelector("#new-card-title");
const addCardURL = document.querySelector("#new-card-url");
const addTitleInput = document.querySelector("#new-card-title-input");
const addURLInput = document.querySelector("#new-card-url-input");
const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector("#card-list");
/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
function openModal(modal) {
  modal.classList.add("modal__opened");
}

function closeModal(modal) {
  modal.classList.remove("modal__opened");
}

function fillProfileForm() {
  profileNameInput.value = profileName.textContent;
  profileTitleInput.value = profileTitle.textContent;
  openModal(profileEditModal);
}

function createCard(card) {
  const cardElement = cardTemplate.cloneNode(true);
  const imageElement = cardElement.querySelector(".card__img");
  imageElement.src = card.link;
  imageElement.alt = card.name;
  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = card.name;
  return cardElement;
}

for (let i = 0; i < initialCards.length; i++) {
  const newCard = createCard(initialCards[i]);
}

function renderCard(newCard) {
  const cardElement = createCard(newCard);
  cardList.prepend(cardElement);
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
  closeModal(addCardModal);
}

function createCard(card) {
  const cardElement = cardTemplate.cloneNode(true);
  const imageElement = cardElement.querySelector(".card__img");
  imageElement.src = card.link;
  imageElement.alt = card.name;
  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = card.name;
  return cardElement;
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
profileEditBtn.addEventListener("click", function () {
  fillProfileForm();
  openModal(profileEditModal);
});

profileEditCloseBtn.addEventListener("click", () => {
  closeModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardBtn.addEventListener("click", () => {
  openModal(addCardModal);
});

addCardCloseBtn.addEventListener("click", () => {
  closeModal(addCardModal);
});

addCardForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach(renderCard);
