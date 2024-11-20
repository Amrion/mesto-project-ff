import { OPEN_MODAL_CLASS } from "./constans";

export function makeModalManager() {
    const popups = document.querySelectorAll('.popup')

    function openPopup(popup) {
        popup.classList.add(OPEN_MODAL_CLASS);

        document.addEventListener('keydown', closeModalByEsc);
    }

    function closePopup(popup) {
        popup.classList.remove(OPEN_MODAL_CLASS);

        document.removeEventListener('keydown', closeModalByEsc);
    }

    function closeModalByEsc(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.popup_is-opened');

            closePopup(openModal);
        }
    }

    popups.forEach((popup) => {
        popup.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains(OPEN_MODAL_CLASS)) {
                closePopup(popup)
            }

            if (e.target.classList.contains('popup__close')) {
                closePopup(popup)
            }
        })
    });

    return {
        openPopup,
        closePopup
    }
}