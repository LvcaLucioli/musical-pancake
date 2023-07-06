const inputFields = document.querySelectorAll('.login input');
inputFields.forEach(inputField => {
    inputField.addEventListener('change', (e) => {
        var disabledButton = true;
        const parentElement = inputField.parentElement;
        if ($(e.target).is(':invalid')) {
            parentElement.classList.add('invalid-input');
        } else {
            parentElement.classList.remove('invalid-input');
        }
        inputFields.forEach(inputField => {
            if (!inputField.validity.valid) {
                disabledButton = false;
            }
        });
        parentElement.parentElement.querySelector("button").disabled = !disabledButton;
    })
});

