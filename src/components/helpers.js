import {OPEN_MODAL_CLASS} from "./constans";

export function closeModalByEsc(e) {
    const openModal = document.querySelector('.popup_is-opened');

    if (e.key === 'Escape') {
        openModal.classList.remove(OPEN_MODAL_CLASS);

        document.removeEventListener('keydown', closeModalByEsc);
    }
}