import {deleteCard, toggleLike} from "./api";

export function makeCardManager() {
    const template = document.getElementById('card-template');

    function createCardItem(card, clientId, {deleteCardItem, openImgModal, addFavouriteCardItem}) {
        const node = template.content.cloneNode(true);

        const cardImg = node.querySelector('.card__image');
        const cardName = node.querySelector('.card__title');
        const deleteBtn = node.querySelector('.card__delete-button');
        const heartIcon = node.querySelector('.card__like-button');
        const countLike = node.querySelector('.cards-like');

        cardImg.src = card.link;
        cardImg.alt = `На фото изображено место ${card.name}`;
        cardName.textContent = card.name;
        countLike.textContent = card.likes.length;

        if (card.likes.find(item => item._id === clientId)) {
            heartIcon.classList.add('card__like-button_is-active');
        }

        if (card.owner._id === clientId) {
            deleteBtn.classList.add('card__delete-button-visible');
            deleteBtn.addEventListener('click', (e) => deleteCardItem(e.target.closest('.places__item'), card._id));
        }

        cardImg.addEventListener('click', () => openImgModal(cardImg, card.name));
        heartIcon.addEventListener('click', (e) => addFavouriteCardItem(e.target, card, clientId, countLike));

        return node;
    }

    async function deleteCardItem(node, id) {
        const result = await deleteCard(id);

        if (result) {
            node.remove();
        }
    }

    async function addFavouriteCardItem(node, card, clientId, countLike) {
        const isCardLiked = node.classList.contains('card__like-button_is-active');

        if (isCardLiked) {
            const result = await toggleLike(card._id, false);

            if (result) {
                node.classList.remove('card__like-button_is-active');

                countLike.textContent = result.likes.length;
            }
        } else {
            const result = await toggleLike(card._id, true);

            if (result) {
                node.classList.add('card__like-button_is-active');

                countLike.textContent = result.likes.length;
            }
        }
    }

    return {
        createCardItem,
        deleteCardItem,
        addFavouriteCardItem,
    }
}



