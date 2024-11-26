export function makeValidationManager() {
    function toggleButtonState(buttonElement, inputElements, inactiveButtonClass) {
        const isInputsError = Array.from(inputElements).some(inputElement => !inputElement.validity.valid);

        if (isInputsError) {
            buttonElement.classList.add(inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(inactiveButtonClass);
            buttonElement.disabled = false;
        }
    }

    function enableValidation({ formElement,
                                inputSelector,
                                submitButtonSelector,
                                inactiveButtonClass,
                                inputErrorClass,
                                errorClass,
                              }) {
        const inputElements = formElement.querySelectorAll(inputSelector);
        const buttonElement = formElement.querySelector(submitButtonSelector);

        inputElements.forEach(inputElement => {
            const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

            inputElement.addEventListener('input', () => {
                if (inputElement.validity.patternMismatch) {
                    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
                } else {
                    inputElement.setCustomValidity("");
                }

                if (!inputElement.validity.valid) {
                    inputElement.classList.add(inputErrorClass);

                    errorElement.textContent = inputElement.validationMessage;
                    errorElement.classList.add(errorClass);
                } else {
                    inputElement.classList.remove(inputErrorClass);

                    errorElement.textContent = '';
                    errorElement.classList.remove(errorClass);
                }

                toggleButtonState(buttonElement, inputElements, inactiveButtonClass);
            })
        });
    }

    function clearValidation({ formElement,
                                 inputSelector,
                                 submitButtonSelector,
                                 inactiveButtonClass,
                                 inputErrorClass,
                                 errorClass,
                             }) {
        const inputElements = formElement.querySelectorAll(inputSelector);
        const buttonElement = formElement.querySelector(submitButtonSelector);

        inputElements.forEach(inputElement => {
            const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

            inputElement.classList.remove(inputErrorClass);
            errorElement.textContent = '';
            errorElement.classList.remove(errorClass);
        });

        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    }

    return {
        enableValidation,
        clearValidation,
    }
}