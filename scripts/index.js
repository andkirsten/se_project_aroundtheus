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

//Photo Modal Elements
const photoModal = document.querySelector("#photo-modal");
const modalCaption = document.querySelector(".modal__photo-caption");
const modalPhoto = document.querySelector(".modal__photo");
const photoModalCloseBtn = document.querySelector("#photo-modal-close-button");

//General Elements
const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector("#card-list");

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
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
  imageElement.addEventListener("click", () => {
    modalPhoto.src = card.link;
    modalPhoto.alt = card.name;
    modalCaption.textContent = card.name;
    openModal(photoModal);
  });
  const cardTitle = cardElement.querySelector(".card__title");
  const likeBtn = cardElement.querySelector(".card__like-button");
  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("card__like-button_active");
  });
  const cardWrapper = cardElement.querySelector(".card");
  const removeBtn = cardElement.querySelector(".card__remove-button");
  removeBtn.addEventListener("click", () => {
    cardWrapper.remove();
  });
  cardTitle.textContent = card.name;
  return cardElement;
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
  e.target.reset();
  closeModal(addCardModal);
}
/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
//Modal Listeners

//Profile Listeners
profileEditBtn.addEventListener("click", function () {
  fillProfileForm();
  openModal(profileEditModal);
});

profileEditCloseBtn.addEventListener("click", () => {
  closeModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

//Add Card Listeners
addCardBtn.addEventListener("click", () => {
  openModal(addCardModal);
});

addCardCloseBtn.addEventListener("click", () => {
  closeModal(addCardModal);
});

addCardForm.addEventListener("submit", handleAddCardSubmit);

photoModalCloseBtn.addEventListener("click", () => {
  closeModal(photoModal);
});

initialCards.forEach(renderCard);
