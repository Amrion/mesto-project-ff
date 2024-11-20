import '../pages/index.css'
import { makeModalManager } from "../components/modal";
import {initialCards} from "../components/constans";
import {makeCardManager} from "../components/cards";

const { openPopup, closePopup } = makeModalManager();
const { createCardItem, deleteCardItem, addFavouriteCardItem } = makeCardManager();

const imgModal = document.querySelector('.popup_type_image');
const modalImage = imgModal.querySelector('.popup__image');
const modalCaption = imgModal.querySelector('.popup__caption');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const cardModal = document.querySelector('.popup_type_new-card');
const userModal = document.querySelector('.popup_type_edit');

const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardImgInput = document.querySelector('.popup__input_type_url');

const nameInput = userModal.querySelector('.popup__input_type_name');
const descriptionInput = userModal.querySelector('.popup__input_type_description');

const formUser = document.forms["edit-profile"];
const formCard = document.forms["new-place"];

const editProfileBtn = document.querySelector('.profile__edit-button');
const addCardBtn = document.querySelector('.profile__add-button');

console.log(editProfileBtn)

const cardList = document.querySelector('.places__list');

initialCards.forEach((item) => renderCard(item));

function openImgModal(cardImgNode, name) {
    openPopup(imgModal);

    modalImage.src = cardImgNode.src;
    modalImage.alt = cardImgNode.alt;
    modalCaption.textContent = name;
}

function renderCard(item, method = "append") {
    const cardElement = createCardItem(item, {deleteCardItem, openImgModal, addFavouriteCardItem});

    cardList[method](cardElement);
}

function submitUserFormHandler(e) {
    e.preventDefault();

    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;

    closePopup(userModal)
}

function submitCardFormHandler(e) {
    e.preventDefault();

    const item = {
        name: cardNameInput.value,
        link: cardImgInput.value,
    }

    renderCard(item, 'prepend')

    e.target.reset();

    closePopup(cardModal)
}

formUser.addEventListener('submit', submitUserFormHandler);
formCard.addEventListener('submit', submitCardFormHandler);

addCardBtn.addEventListener('click', () => {
    console.log(111)

    openPopup(cardModal);
});

editProfileBtn.addEventListener('click', () => {
    console.log(111)

    openPopup(userModal);

    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
});
