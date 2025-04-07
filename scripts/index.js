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
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardTitleInput = addCardFormElement.querySelector(
  "#add-card-title-input"
);
const cardTitleURL = addCardFormElement.querySelector("#profile-URL-input");
const pictureModal = document.querySelector("#picture-modal");
const pictureModalImage = pictureModal.querySelector(".modal__picture");
const pictureModalCaption = pictureModal.querySelector(
  ".modal__picture-caption"
);
const pictureModalClose = pictureModal.querySelector("#picture-modal-close");

/*functions*/

function openModal(modal) {
  modal.classList.add("modal_opened");
  modal.addEventListener("mousedown", handleClickOutside);
  document.addEventListener("keydown", handleEscapeKey);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("mousedown", handleClickOutside);
  document.removeEventListener("keydown", handleEscapeKey);
}

function renderCard(cardData, cardsListEL) {
  const cardElement = getCardElement(cardData);
  cardsListEL.prepend(cardElement);
}

function handleEscapeKey(e) {
  if (e.key === "Escape") {
    const currentModel = document.querySelector(".modal_opened");
    closeModal(currentModel);
  }
}

function handleClickOutside(e) {
  if (e.target.classList.contains("modal_opened")) {
    closeModal(e.target);
  }
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEL = cardElement.querySelector(".card__image");
  const cardTitleEL = cardElement.querySelector(".card__description-title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  cardImageEL.src = cardData.link;
  cardImageEL.alt = cardData.name;
  cardTitleEL.textContent = cardData.name;
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  cardImageEL.addEventListener("click", () => {
    pictureModalImage.src = cardData.link;
    pictureModalImage.alt = cardData.name;
    pictureModalCaption.textContent = cardData.name;
    openModal(pictureModal);
  });
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
}

/*event handlers*/
function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardTitleURL.value;
  renderCard({ name, link }, cardsListEL);
  e.target.reset();
  closeModal(addCardModal);
}

function handleProfileSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

/*event listeners*/
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});
profileEditCloseButton.addEventListener("click", () => {
  closeModal(profileEditModal);
});
pictureModalClose.addEventListener("click", () => {
  closeModal(pictureModal);
});
profileEditForm.addEventListener("submit", handleProfileSubmit);
addNewCardButton.addEventListener("click", () => openModal(addCardModal));
closeNewCardModal.addEventListener("click", () => closeModal(addCardModal));

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardsListEL));
