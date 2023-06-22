const inputFields = document.querySelectorAll('.login input');
inputFields.forEach(inputField => {
    inputField.addEventListener('change', (e) => {
        const parentElement = inputField.parentElement;
        if( $(e.target).is(':invalid')){
            parentElement.classList.add('invalid-input');
        }else{
            parentElement.classList.remove('invalid-input');
        }        
    })
});