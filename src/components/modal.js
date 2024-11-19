import {initialCards, OPEN_MODAL_CLASS} from "./constans";
import { closeModalByEsc } from "./helpers";
import { makeCardManager } from "./cards";

export function startApp() {
    const cardList = document.querySelector('.places__list');
    const { createCardItem, deleteCardItem, addToFavourite, openImgModal } = makeCardManager();

    initialCards.forEach((item) => {
        cardList.append(createCardItem(item, deleteCardItem, openImgModal, addToFavourite));
    });

    const modals = document.querySelectorAll('.popup');
    const cardModal = document.querySelector('.popup_type_new-card');
    const userModal = document.querySelector('.popup_type_edit');

    const closeCardModalBtn = cardModal.querySelector('.popup__close');
    const closeUserModalBtn = userModal.querySelector('.popup__close');

    const profileName = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    const cardNameInput = document.querySelector('.popup__input_type_card-name');
    const cardImgInput = document.querySelector('.popup__input_type_url');
    const formCard = cardModal.querySelector('.popup__form');

    const nameInput = userModal.querySelector('.popup__input_type_name');
    const descriptionInput = userModal.querySelector('.popup__input_type_description');
    const formUser = userModal.querySelector('.popup__form');

    const editProfileBtn = document.querySelector('.profile__edit-button');
    const addCardBtn = document.querySelector('.profile__add-button');

    function closeUserModal() {
        userModal.classList.remove(OPEN_MODAL_CLASS);

        document.removeEventListener('keydown', closeModalByEsc);
    }

    function closeCardModal() {
        cardModal.classList.remove(OPEN_MODAL_CLASS);

        document.removeEventListener('keydown', closeModalByEsc);
    }

    function submitUserFormHandler(e) {
        e.preventDefault();

        profileName.textContent = nameInput.value;
        profileDescription.textContent = descriptionInput.value;

        closeUserModal();
    }

    function submitCardFormHandler(e) {
        e.preventDefault();

        const item = {
            name: cardNameInput.value,
            link: cardImgInput.value,
        }

        cardList.prepend(createCardItem(item, deleteCardItem, openImgModal, addToFavourite));

        closeCardModal();
    }

    formUser.addEventListener('submit', submitUserFormHandler);
    formCard.addEventListener('submit', submitCardFormHandler);

    modals.forEach((modal) => {
        modal.addEventListener('click', (e) => {
            if (e.target !== e.currentTarget) return;

            modal.classList.remove(OPEN_MODAL_CLASS);

            document.removeEventListener('keydown', closeModalByEsc);
        });
    });

    addCardBtn.addEventListener('click', () => {
        cardModal.classList.add(OPEN_MODAL_CLASS);

        document.addEventListener('keydown', closeModalByEsc);
    });

    editProfileBtn.addEventListener('click', () => {
        userModal.classList.add(OPEN_MODAL_CLASS);

        nameInput.value = profileName.textContent;
        descriptionInput.value = profileDescription.textContent;

        document.addEventListener('keydown', closeModalByEsc);
    });

    closeCardModalBtn.addEventListener('click', closeCardModal);

    closeUserModalBtn.addEventListener('click', closeUserModal);
}