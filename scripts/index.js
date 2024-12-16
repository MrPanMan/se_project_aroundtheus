const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

console.log(initialCards);

/*elements*/
const profileEditCloseButton = document.querySelector(
  "#profile-edit-close-button"
);
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileName = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardsListEL = document.querySelector(".cards__list");
const addNewCardButton = document.querySelector(".profile__add-button");
const closeNewCardModal = addCardModal.querySelector(".modal__close-button");
const profileFormElement = profileEditModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardTitleInput = addCardFormElement.querySelector("#profile-title-input");
const cardTitleURL = addCardFormElement.querySelector("#profile-URL-input");

/*functions*/
function closePopUp() {
  profileEditModal.classList.remove("modal_opened");
}

function closeAddModal() {
  addCardModal.classList.remove("modal_opened");
}

function openModal() {
  addCardModal.classList.add("modal_opened");
}

function renderCard(cardData, cardsListEL) {
  const CardElement = getCardElement(cardData);
  cardsListEL.prepend(CardElement);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEL = cardElement.querySelector(".card__image");
  const cardTitleEL = cardElement.querySelector(".card__description-title");
  const likeButton = cardElement.querySelector(".card__like-button");
  cardImageEL.src = cardData.link;
  cardImageEL.alt = cardData.name;
  cardTitleEL.textContent = cardData.name;
  return cardElement;
}

/*event handlers*/
function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardTitleURL.value;
  renderCard({ name, link }, cardsListEL);
  closePopUp();
}

function handleProfileSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp();
}

/*event listeners*/
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
});
profileEditCloseButton.addEventListener("click", () => {
  closePopUp(profileEditModal);
});
profileEditForm.addEventListener("submit", handleProfileSubmit);
addNewCardButton.addEventListener("click", () => openModal(addCardModal));
closeNewCardModal.addEventListener("click", () => closeAddModal(addCardModal));

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardsListEL));

const likeButtons = document.querySelectorAll(".card__like-button");
likeButtons.forEach((likeButton) => {
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
});
