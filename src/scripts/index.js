import '../pages/index.css';
import { makeModalManager } from "../components/modal";
import { initialCards } from "../components/constans";
import { makeCardManager } from "../components/cards";
import { makeValidationManager } from "../components/validation";
import {getProfileInfo, getCards, changeProfile, uploadCards, uploadAvatar} from "../components/api";

const { openPopup, closePopup } = makeModalManager();
const { createCardItem, deleteCardItem, addFavouriteCardItem } = makeCardManager();
const { enableValidation, clearValidation } = makeValidationManager();

const imgModal = document.querySelector('.popup_type_image');
const modalImage = imgModal.querySelector('.popup__image');
const modalCaption = imgModal.querySelector('.popup__caption');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

const cardModal = document.querySelector('.popup_type_new-card');
const userModal = document.querySelector('.popup_type_edit');
const avatarModal = document.querySelector('.popup_type_avatar');

const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardImgInput = document.querySelector('.popup__input_type_url');
const buttonCardModal = cardModal.querySelector('.popup__button');

const avatarFormInput = document.querySelector('.popup__input_type_avatar');
const buttonAvatarModal = avatarModal.querySelector('.popup__button');

const nameInput = userModal.querySelector('.popup__input_type_name');
const descriptionInput = userModal.querySelector('.popup__input_type_description');
const buttonUserModal = userModal.querySelector('.popup__button');

const formUser = document.forms["edit-profile"];
const formCard = document.forms["new-place"];
const formAvatar = document.forms["edit-avatar"];

const editProfileBtn = document.querySelector('.profile__edit-button');
const addCardBtn = document.querySelector('.profile__add-button');
const avatarBtn = document.querySelector('.profile__image');

const cardList = document.querySelector('.places__list');

const dataResults = await Promise.all([
    getProfileInfo(),
    getCards(),
]);

let clientId;

if (dataResults[0]) {
    profileName.textContent = dataResults[0].name;
    profileDescription.textContent = dataResults[0].about;
    profileAvatar.style = `background-image: url(${dataResults[0].avatar})`;

    clientId = dataResults[0]._id;
} else {
    profileName.textContent = 'Ваше имя';
    profileDescription.textContent = 'Ваше описание';
}

if (dataResults[1]) {
    dataResults[1].forEach((item) => renderCard(item, clientId));
} else {
    initialCards.forEach((item) => renderCard(item, clientId));
}

const validationConfigDefault = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'input-error',
    errorClass: 'popup__input-error_active',
}
const userValidationConfig = {
    formElement: formUser,
    ...validationConfigDefault,
}
const cardValidationConfig = {
    formElement: formCard,
    ...validationConfigDefault,
}
const avatarValidationConfig = {
    formElement: formAvatar,
    ...validationConfigDefault,
}

function openImgModal(cardImgNode, name) {
    openPopup(imgModal);

    modalImage.src = cardImgNode.src;
    modalImage.alt = cardImgNode.alt;
    modalCaption.textContent = name;
}

function renderCard(item, clientId, method = "append") {
    const cardElement = createCardItem(item, clientId, {deleteCardItem, openImgModal, addFavouriteCardItem});

    cardList[method](cardElement);
}

async function submitUserFormHandler(e) {
    buttonUserModal.textContent = 'Сохранить...';

    e.preventDefault();

    const result = await changeProfile(nameInput.value, descriptionInput.value);

    if (result) {
        profileName.textContent = nameInput.value;
        profileDescription.textContent = descriptionInput.value;

        closePopup(userModal);

        buttonUserModal.textContent = 'Сохранить';
    }
}

async function submitCardFormHandler(e) {
    buttonCardModal.textContent = 'Сохранить...';

    e.preventDefault();

    const item = {
        name: cardNameInput.value,
        link: cardImgInput.value,
    }

    const result = await uploadCards(item.name, item.link);

    if (result) {
        renderCard(result, clientId,  'prepend');

        e.target.reset();

        closePopup(cardModal);

        buttonCardModal.textContent = 'Сохранить';
    }
}

async function submitAvatarFormHandler(e) {
    buttonAvatarModal.textContent = 'Сохранить...';

    e.preventDefault();

    const result = await uploadAvatar(avatarFormInput.value);

    if (result) {
        avatarBtn.style = `background-image: url(${avatarFormInput.value})`;

        e.target.reset();

        closePopup(avatarModal);

        buttonAvatarModal.textContent = 'Сохранить';
    }
}

formUser.addEventListener('submit', submitUserFormHandler);
formCard.addEventListener('submit', submitCardFormHandler);
formAvatar.addEventListener('submit', submitAvatarFormHandler);

enableValidation(userValidationConfig);
enableValidation(cardValidationConfig);
enableValidation(avatarValidationConfig);

addCardBtn.addEventListener('click', () => {
    clearValidation(userValidationConfig);
    openPopup(cardModal);
});

editProfileBtn.addEventListener('click', () => {
    clearValidation(userValidationConfig);
    openPopup(userModal);

    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
});

avatarBtn.addEventListener('click', () => {
    clearValidation(userValidationConfig);
    openPopup(avatarModal);
});

