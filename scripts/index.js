const template = document.getElementById('card-template');
const cardList = document.querySelector('.places__list');

function createCardItem(card, deleteNodeFunc) {
    const node = template.content.cloneNode(true);

    const cardImg = node.querySelector('.card__image');
    const cardName = node.querySelector('.card__title');
    const deleteBtn = node.querySelector('.card__delete-button');

    cardImg.src = card.link;
    cardName.textContent = card.name;

    deleteBtn.addEventListener('click', (e) => deleteNodeFunc(e.target.parentNode))

    return node;
}

function deleteCardItem(node) {
    node.remove();
}

initialCards.forEach((item) => {
    cardList.append(createCardItem(item, deleteCardItem));
});
