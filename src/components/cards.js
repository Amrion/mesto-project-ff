import { OPEN_MODAL_CLASS } from "./constans";
import {closeModalByEsc} from "./helpers";

export function makeCardManager() {
    const template = document.getElementById('card-template');
    const imgModal = document.querySelector('.popup_type_image');
    const closeBtnModal = imgModal.querySelector('.popup__close');

    function createCardItem(card, deleteNodeFunc, openModalFunc, likeIconFunc) {
        const node = template.content.cloneNode(true);

        const cardImg = node.querySelector('.card__image');
        const cardName = node.querySelector('.card__title');
        const deleteBtn = node.querySelector('.card__delete-button');
        const heartIcon = node.querySelector('.card__like-button');

        cardImg.src = card.link;
        cardImg.alt = `На фото изображено место ${card.name}`;
        cardName.textContent = card.name;

        deleteBtn.addEventListener('click', (e) => deleteNodeFunc(e.target.parentNode));
        cardImg.addEventListener('click', () => openModalFunc(cardImg, card.name));
        heartIcon.addEventListener('click', (e) => likeIconFunc(e.target));

        return node;
    }

    function deleteCardItem(node) {
        node.remove();
    }

    function openImgModal(cardImgNode, name) {
        imgModal.classList.add(OPEN_MODAL_CLASS);

        imgModal.querySelector('.popup__image').src = cardImgNode.src;
        imgModal.querySelector('.popup__image').alt = cardImgNode.alt;
        imgModal.querySelector('.popup__caption').textContent = name;

        document.addEventListener('keydown', closeModalByEsc);
    }

    function addToFavourite(node) {
        node.classList.toggle('card__like-button_is-active');
    }

    closeBtnModal.addEventListener('click', () => {
        imgModal.classList.remove(OPEN_MODAL_CLASS);

        document.removeEventListener('keydown', closeModalByEsc);
    });

    return {
        createCardItem,
        deleteCardItem,
        openImgModal,
        addToFavourite,
    }
}



