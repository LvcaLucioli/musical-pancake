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