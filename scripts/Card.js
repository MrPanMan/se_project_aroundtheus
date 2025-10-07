export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    (".card__like-button");
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleIcon();
      });
    (".card__delete-button");
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteButton();
      });
  }

  _handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle(".card__like-button_active");
  }

  getVeiw() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    const cardImageEL = this._cardElement.querySelector(".card__image");

    cardImageEL.alt = this._name;
    cardImageEL.src = this._link;

    cardImageEL.addEventListener("click", () => {
      pictureModalImage.src = cardData.link;
      pictureModalImage.alt = cardData.name;
      pictureModalCaption.textContent = cardData.name;

      openModal(pictureModal);
    });

    const cardTitleEL = this._cardElement.querySelector(
      ".card__description-title"
    );

    cardTitleEL.textContent = this._name;

    const likeButton = this._cardElement.querySelector(".card__like-button");

    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_active");
    });

    const deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    deleteButton.addEventListener("click", () => {
      cardElement.remove();
    });

    return this._cardElement;
  }
}
