const inputFields = document.querySelectorAll('.login input');
console.log(inputFields);
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

function checkPassword(){
    var passwordField = document.querySelector('.login #password');
    var confirmPasswordField = document.querySelector('.login #confirm-password');

    if (confirmPasswordField.value == passwordField.value){
        passwordField.parentElement.classList.remove('invalid-input');
        confirmPasswordField.parentElement.classList.remove('invalid-input');
    }else{
        passwordField.parentElement.classList.add('invalid-input');
        confirmPasswordField.parentElement.classList.add('invalid-input');
    }
    
}
const password = document.querySelector('.login #password');
const confirmPassword = document.querySelector('.login #confirm-password');

password.addEventListener('change', checkPassword);

confirmPassword.addEventListener('change', checkPassword);