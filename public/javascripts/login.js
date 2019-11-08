const eyeIcon = document.getElementById('login-psw-eye');
const eyeSlashIcon = document.getElementById('login-psw-eye-slash');
const passwordInput = document.getElementById('password');

eyeIcon.addEventListener('click', changePasswordInput(eyeSlashIcon, eyeIcon, passwordInput, 'password'));
eyeSlashIcon.addEventListener('click', changePasswordInput(eyeIcon, eyeSlashIcon, passwordInput, 'text'));

function changePasswordInput (icon1, icon2, inputField, inputType) {
    return function () {
        icon1.classList.remove('hide-element');
        icon2.classList.add('hide-element');
        inputField.type = inputType;
    }
}
