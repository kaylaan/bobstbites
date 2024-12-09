let signuptext = document.querySelector('#signuptext')
let logintext = document.querySelector('#logintext')
let signup = document.querySelector('#signup')
let login = document.querySelector('#login')

signuptext.addEventListener('click', signupDisplay)
logintext.addEventListener('click', loginDisplay)

function signupDisplay() {
    signup.classList.remove('hide')
    login.classList.add('hide')
    signuptext.style.color = 'black'
    logintext.style.color = 'gray'
}

function loginDisplay() {
    login.classList.remove('hide')
    signup.classList.add('hide')
    logintext.style.color = 'black'
    signuptext.style.color = 'gray'
}