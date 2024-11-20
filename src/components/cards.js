export function makeCardManager() {
    const template = document.getElementById('card-template');

    function createCardItem(card, {deleteCardItem, openImgModal, addFavouriteCardItem}) {
        const node = template.content.cloneNode(true);

        const cardImg = node.querySelector('.card__image');
        const cardName = node.querySelector('.card__title');
        const deleteBtn = node.querySelector('.card__delete-button');
        const heartIcon = node.querySelector('.card__like-button');

        cardImg.src = card.link;
        cardImg.alt = `На фото изображено место ${card.name}`;
        cardName.textContent = card.name;

        deleteBtn.addEventListener('click', (e) => deleteCardItem(e.target.closest('.places__item')));
        cardImg.addEventListener('click', () => openImgModal(cardImg, card.name));
        heartIcon.addEventListener('click', (e) => addFavouriteCardItem(e.target));

        return node;
    }

    function deleteCardItem(node) {
        node.remove();
    }

    function addFavouriteCardItem(node) {
        node.classList.toggle('card__like-button_is-active');
    }

    return {
        createCardItem,
        deleteCardItem,
        addFavouriteCardItem,
    }
}



